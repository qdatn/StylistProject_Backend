import ProductRepository from "@modules/product/product.repository";
import ProductDto from "@modules/product/dtos/product.dto";
import { uploadImage } from "@core/utils";
import IProduct from "./product.interface";
import mongoose from "mongoose";
import getFolderFromUrl from "@core/utils/getFolderFromUrl";
import Product from "./product.model";
import { Category } from "@modules/category";

class ProductService {
  async getAllProducts() {
    return await ProductRepository.findAll();
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

  async uploadImage(
    fileBuffer: any,
    folder: string,
    product_folder_name: string
  ) {
    const result: any = await uploadImage(
      fileBuffer,
      folder,
      product_folder_name
    );
    return result;
  }
}

export default new ProductService();
