import ProductRepository from "@modules/product/product.repository";
import ProductDto from "@modules/product/dtos/product.dto";
import { deleteImage, uploadImage } from "@core/utils";
import IProduct from "./product.interface";
import mongoose from "mongoose";
import getFolderFromUrl from "@core/utils/getFolderFromUrl";
import Product from "./product.model";
import { Category, CategoryService } from "@modules/category";
import { UserInfo } from "@modules/userInfo";
import { getGeminiRecommendation } from "@core/utils/geminiApi";
import * as XLSX from "xlsx";
import fs from "fs";
import { AttributeService } from "@modules/attribute";

class ProductService {
  async getAllProducts() {
    return await ProductRepository.findAll();
  }

  async getProductsByField(query: Record<string, any>) {
    return await ProductRepository.findByFilter(query);
  }

  async getAllProductActive() {
    return await ProductRepository.findAllProductActive();
  }

  async getProductById(productId: string) {
    return await ProductRepository.findById(productId);
  }

  async createProduct(productData: ProductDto): Promise<IProduct | any> {
    // Create product without image

    return await ProductRepository.create(productData);
  }

  async createManyProducts(productDatas: ProductDto[]) {
    return await ProductRepository.createMany(productDatas);
  }

  async updateProduct(productId: string, productData: ProductDto) {
    // productData._id = new mongoose.Types.ObjectId(productData._id as string);
    // productData.categories = productData.categories!.map((categoryId) => {
    //   return new mongoose.Types.ObjectId(categoryId as string);
    // });

    // const images = Array.isArray(productData.images) ? productData.images : [];

    // if (images && images.length > 0) {
    //   // Duyệt mảng và tải lên từng ảnh đồng thời
    //   const uploadedImages: any = await Promise.all(
    //     images.map((image) => {
    //       if (
    //         typeof image === "string" &&
    //         !image.includes("res.cloudinary.com")
    //       ) {
    //         uploadImage(
    //           image,
    //           `product`,
    //           `${productData.product_name}_${getFolderFromUrl(image)}`
    //         );
    //       } else {
    //         return image;
    //       }
    //     })
    //   );

    //   // Lưu mảng URL ảnh đã tải lên vào `productData.images`
    //   productData.images = uploadedImages;
    // }

    return await ProductRepository.update(productId, productData);
  }

  async deleteProduct(productId: string) {
    return await ProductRepository.delete(productId);
  }

  async searchProductsByName(name: string) {
    return await ProductRepository.findByName(name);
  }

  async filterProducts(
    name: string = "",
    category: string = "",
    sortBy: string = "product_name",
    sortOrder: string = "asc"
  ) {
    const filter: any = {};

    // Tìm kiếm theo tên sản phẩm
    if (name) {
      filter.product_name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    // Lọc theo tên danh mục
    if (category) {
      const categoryNames = category.split(",").map((name) => name.trim());
      const categories = await Category.find(
        categoryNames[0] == "All"
          ? {}
          : {
              category_name: {
                $in: categoryNames.map((name) => new RegExp(name, "i")),
              },
            }
      );

      if (categories.length === 0) {
        throw new Error(
          `No categories found for names: ${categoryNames.join(", ")}`
        );
      }

      filter.categories = { $in: categories.map((cat) => cat._id) };
    }

    // Sắp xếp kết quả
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder.toLowerCase() === "desc" ? -1 : 1;

    // Thực hiện tìm kiếm, lọc và sắp xếp
    return await Product.find(filter).populate("categories").sort(sortOptions);
  }

  async uploadImage(image: any, folder: string, product_folder_name: string) {
    const result: any = await uploadImage(image, folder, product_folder_name);
    return result.secure_url;
  }

  async deleteImage(
    imageUrl: string,
    folder: string,
    product_folder_name: string
  ) {
    return await deleteImage(imageUrl, folder, product_folder_name);
  }

  async getRecommendedProductsForUser(userId: string) {
    // 1. Get UserInfo & StylePreference
    const userInfo = await UserInfo.findOne({ user: userId }).populate(
      "style_preferences"
    );
    if (!userInfo || !userInfo.style_preferences) {
      throw new Error("User info or style preferences not found");
    }

    const stylePreferences = userInfo.style_preferences;

    // 2. Get all products
    const products = await Product.find({ status: true }).lean();

    // 3. Generate prompt for Gemini
    const prompt = `
  Based on the following fashion style preferences of the user:
  
  ${JSON.stringify(stylePreferences, null, 2)}
  
  Please evaluate how well each product matches the user's preferences on a scale from 0 to 10, where a higher score indicates a better match.
  
  Return a list of products sorted by relevance score in descending order, in the following JSON format:
  [
    {
      product_id: "...",
      score: 9.5
    },
    ...
  ]
  
  Here is the list of products:
  ${JSON.stringify(products, null, 2)}
  `;

    // 4. Gửi đến Gemini API để đánh giá độ phù hợp
    const recommended = await getGeminiRecommendation(prompt);

    // 5. Parse kết quả và sắp xếp sản phẩm theo điểm
    const scoresMap = new Map();
    recommended.forEach((item: any) => {
      scoresMap.set(item.product_id, item.score);
    });

    const sortedProducts = products.sort((a: any, b: any) => {
      const scoreA = scoresMap.get(String(a._id)) || 0;
      const scoreB = scoresMap.get(String(b._id)) || 0;
      return scoreB - scoreA;
    });

    const sortedProductIds = sortedProducts.map((item) => item._id);

    return sortedProductIds;
  }

  async importFromExcel(filePath: string): Promise<{
    insertedCount: number;
    failedRows: any[];
  }> {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const attributeDocs = await AttributeService.getAllAttributes();
    const attributeMap = new Map<string, string[]>();
    attributeDocs.forEach((attr) => attributeMap.set(attr.key, attr.value));

    const allCategories = await CategoryService.getAllCategories();
    const categoryNameToId = new Map<string, string>();
    allCategories.forEach((cat) =>
      categoryNameToId.set(cat.category_name, cat._id.toString())
    );

    const groupedProducts = new Map<
      string,
      {
        baseInfo: any;
        variants: any[];
      }
    >();
    const failedRows: any[] = [];

    for (const raw of data) {
      const row = raw as Record<string, any>;
      const {
        product_name,
        description,
        brand,
        status,
        price,
        stock_quantity,
        min_quantity,
        sold_quantity,
        stock_update_date,
        attributes,
        images,
        categories,
      } = row;

      if (!product_name || price == null || stock_quantity == null) {
        failedRows.push({ ...row, error: "Missing required fields" });
        continue;
      }

      // Parse image list
      const imageList =
        typeof images === "string"
          ? images.split(",").map((img: string) => img.trim())
          : [];

      // Parse categories
      const categoryNames =
        typeof categories === "string"
          ? categories.split(",").map((c: string) => c.trim())
          : [];

      const categoryList: string[] = [];
      let hasInvalidCategory = false;
      for (const name of categoryNames) {
        const id = categoryNameToId.get(name);
        if (id) categoryList.push(id);
        else {
          failedRows.push({
            ...row,
            error: `Invalid category name: ${name}`,
          });
          hasInvalidCategory = true;
          break;
        }
      }
      if (hasInvalidCategory) continue;

      // Parse attributes
      let attributeList: { key: string; value: string }[] = [];
      if (attributes) {
        const pairs = attributes.split(";");
        for (const pair of pairs) {
          const [key, value] = pair.split("=");
          if (
            key &&
            value &&
            attributeMap.has(key) &&
            attributeMap.get(key)!.includes(value)
          ) {
            attributeList.push({ key, value });
          } else {
            failedRows.push({
              ...row,
              error: `Invalid attribute: ${key}=${value}`,
            });
            attributeList = [];
            break;
          }
        }
      }

      if (attributeList.length === 0) continue;

      const variant = {
        attributes: attributeList,
        price: Number(price),
        stock_quantity: Number(stock_quantity),
        min_quantity: Number(min_quantity ?? 0),
        sold_quantity: Number(sold_quantity ?? 0),
        stock_update_date: stock_update_date
          ? new Date(stock_update_date)
          : new Date(),
      };

      if (groupedProducts.has(product_name)) {
        groupedProducts.get(product_name)!.variants.push(variant);
      } else {
        groupedProducts.set(product_name, {
          baseInfo: {
            product_name,
            description: description ?? "No description provided",
            brand: brand ?? "No brand provided",
            status: status === "true" || status === true,
            images: imageList,
            categories: categoryList,
          },
          variants: [variant],
        });
      }
    }

    const validProducts = Array.from(groupedProducts.values()).map((p) => ({
      ...p.baseInfo,
      variants: p.variants,
    }));

    const inserted = await ProductRepository.createMany(validProducts);
    fs.unlinkSync(filePath);

    return {
      insertedCount: inserted.length,
      failedRows,
    };
  }
}

export default new ProductService();
