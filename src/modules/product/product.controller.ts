import { pagination } from "@core/middlewares";
import { deleteImage, uploadImage } from "@core/utils";
import ProductService from "@modules/product/product.service";
import { Request, Response, NextFunction } from "express";
import ProductDto from "./dtos/product.dto";
import IProduct from "./product.interface";
import Product from "./product.model";
import { DiscountService } from "@modules/discount";
import mongoose from "mongoose";

class ProductController {
  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products =
        Array.isArray(req.body?.products) && req.body.products.length > 0
          ? req.body.products
          : await ProductService.getAllProducts();
      // const products = await ProductService.getAllProducts();
      await pagination(req, res, products, next);
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllProductsByField(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Lấy các tham số từ query string
      const { field, value } = req.query;

      const query: Record<string, any> = {};
      if (field && value) {
        const fieldStr = String(field);
        const valueStr = String(value);

        // Tạo query object động
        // query[fieldStr] = { $regex: valueStr.toString(), $options: "i" }; // Tìm kiếm không phân biệt hoa thường
        if (["true", "false"].includes(valueStr.toLowerCase())) {
          query[fieldStr] = valueStr.toLowerCase() === "true";
        } else if (!isNaN(Number(valueStr))) {
          query[fieldStr] = Number(valueStr);
        } else if (
          fieldStr === "categories" &&
          mongoose.Types.ObjectId.isValid(valueStr)
        ) {
          // Tìm document mà categories chứa ObjectId này
          query[fieldStr] = new mongoose.Types.ObjectId(valueStr);
        } else {
          query[fieldStr] = { $regex: valueStr, $options: "i" };
        }
      }
      // Lấy sản phẩm từ service
      const products = await ProductService.getProductsByField(query);

      // Phân trang và trả kết quả
      await pagination(req, res, products, next);
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      next(error);
    }
  }

  // Fetch product by product id list
  async fetchAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const productIds: string[] = req.body.productIds;

    if (!productIds || !Array.isArray(productIds)) {
      res
        .status(400)
        .json({ message: "Missing or invalid productIds in request body" });
      return;
    }

    // Truy vấn DB lấy sản phẩm theo ID
    const products = await Product.find({ _id: { $in: productIds } }).lean();

    // Bảo toàn thứ tự ID từ client
    const productMap = new Map(products.map((p) => [String(p._id), p]));
    const orderedProducts = productIds
      .map((id) => productMap.get(String(id)))
      .filter(Boolean);

    // Gọi hàm phân trang
    await pagination(req, res, orderedProducts, next);

    res.status(200).json(res.locals.pagination);
  }

  async getAllProductsByStyle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.userId;
      const sortedProductIds =
        await ProductService.getRecommendedProductsForUser(userId);

      // // Lấy toàn bộ sản phẩm theo các ID đó
      // const products = await Product.find({
      //   _id: { $in: sortedProductIds },
      // }).lean();

      // // Map lại sản phẩm theo thứ tự đã gợi ý
      // const productMap = new Map(products.map((p) => [String(p._id), p]));
      // const orderedProducts = sortedProductIds
      //   .map((id) => productMap.get(String(id)))
      //   .filter(Boolean);

      // Phân trang
      // await pagination(req, res, orderedProducts, next);
      // res.status(200).json(res.locals.pagination);
      // res.status(200).json(orderedProducts);
      res.status(200).json(sortedProductIds);
    } catch (error: any) {
      next(error);
    }
  }

  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error: any) {
      next(error);
    }
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const product = await ProductService.createProduct(req.body);
      // res.status(201).json(product);
      const products_req = req.body; // Dữ liệu sản phẩm gửi từ client
      const productData = await ProductService.createProduct({
        ...products_req,
        images: [],
      });
      const product = await ProductService.createProduct(productData);

      // Nếu có ảnh, upload từng ảnh
      if (req.body.images && req.body.images.length > 0) {
        const uploadPromises = req.body.images.map(async (image: string) => {
          try {
            return await ProductService.uploadImage(
              image,
              "product",
              product._id
            );
          } catch (error) {
            console.error(`Error uploading image: ${image}`, error);
            return null;
          }
        });

        const uploadedImages = (await Promise.all(uploadPromises)).filter(
          (url) => url !== null
        );

        // Cập nhật sản phẩm với danh sách ảnh đã upload
        const updatedProduct = await ProductService.updateProduct(product._id, {
          ...productData,
          images: uploadedImages,
        });

        res.status(201).json(updatedProduct);
      } else {
        res.status(201).json(product);
      }

      // //Upload image to cloudinary
      // const images: any = await Promise.all(
      //   products.images.map(async (image: string) => {
      //     const uploadImage: any = await ProductService.uploadImage(
      //       image,
      //       "product",
      //       // addProduct._id
      //       "ABCTest"
      //     );
      //     return uploadImage.secure_url;
      //   })
      // );

      // const newProducts = await ProductService.updateProduct(addProduct._id, {
      //   ...addProduct,
      //   images: images,
      // });
      // res.status(201).json({
      //   message: "Products added successfully",
      //   addPriduct: addProduct,
      //   newProduct: newProducts,
      //   images: images,
      // });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async createManyProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = req.body; // Dữ liệu sản phẩm gửi từ client
      const newProducts = await ProductService.createManyProducts(products);
      res
        .status(201)
        .json({ message: "Products added successfully", data: newProducts });
    } catch (error: any) {
      next(error);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body
      );
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json({ message: "Product deleted" });
      }
      // res.status(204).send();
    } catch (error: any) {
      if (error.status === 409) {
        res.status(409).json({
          message: "Product is used in an order item and cannot be deleted.",
        });
      } else {
        next(error);
      }
    }
  }

  public async searchProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const name = req.query.name as string; // Lấy từ query string
      if (!name) {
        res.status(400).json({ message: "Name query parameter is required" });
        return;
      }

      const products = await ProductService.searchProductsByName(name);
      await pagination(req, res, products, next);
      res.status(200).json(res.locals.pagination);
      // res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  async getFilteredProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const { name, category, sortBy, sortOrder } = req.query;
      const name = req.query.name as string;
      const category = req.query.category as string;
      const sortBy = req.query.sortBy as string;
      const sortOrder = req.query.sortOrder as string;

      const products = await ProductService.filterProducts(
        name,
        category,
        sortBy,
        sortOrder
      );
      await pagination(req, res, products, next);
      res.status(200).json(res.locals.pagination);
    } catch (error) {
      next(error);
    }
  }

  async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const image: any = req.file;
      const files = req.files as Express.Multer.File[];
      const { id } = req.params;
      // const result = await ProductService.uploadImage(image, "product", id);
      const uploadPromises = files.map((file) =>
        ProductService.uploadImage(file, "product", id)
      );

      const results = await Promise.all(uploadPromises);
      const imageUrls = results.map((result) => result);
      // Cập nhật sản phẩm với ảnh mới
      await Product.findByIdAndUpdate(id, {
        $push: { images: { $each: imageUrls } },
      });
      res.status(200).json({ imageUrls: imageUrls });
    } catch (error: any) {
      next(error.message);
    }
  }

  async deleteImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { imageUrl } = req.body;
      const { id } = req.params;
      const result = await ProductService.deleteImage(imageUrl, "product", id);
      if (result.result === "ok") {
        res.status(200).json({ message: `Delete success image ${imageUrl}` });
      } else {
        next({ message: `Delete fail image ${imageUrl}` });
      }
      // ({ imageUrl: result });
    } catch (error: any) {
      next(error.message);
    }
  }

  async getAllProductIdsFromProductDiscounts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productIds =
        await DiscountService.getAllProductIdsFromProductDiscounts();

      const products = await Product.find({ _id: { $in: productIds } }).lean();
      res.status(200).json({
        data: products,
      });
    } catch (error: any) {
      next({
        message: "Failed to get product IDs from product discounts.",
        error: error.message,
      });
    }
  }

  async importFromExcel(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const result = await ProductService.importFromExcel(file.path);

      res.status(200).json({
        message: "Import successful",
        inserted: result.insertedCount,
        failed: result.failedRows,
      });
    } catch (error: any) {
      next({
        message: "Failed to import products from Excel.",
        error: error.message,
      });
    }
  }
}

export default new ProductController();
