import { pagination } from "@core/middlewares";
import { uploadImage } from "@core/utils";
import ProductService from "@modules/product/product.service";
import { Request, Response, NextFunction } from "express";
import ProductDto from "./dtos/product.dto";
import IProduct from "./product.interface";

class ProductController {
  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      await pagination(req, res, products, next);
      res.status(200).json(res.locals.pagination);
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
      const products = req.body; // Dữ liệu sản phẩm gửi từ client
      return await ProductService.createProduct({
        ...products,
        images: [],
      });

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
      next(error);
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
      // const file: any = req.file;
      const { productid, images } = req.body;
      if (!images) res.status(400).json({ message: "No file uploaded" });

      const data: any = await Promise.all(
        images.map(async (image: string) => {
          const uploadImage: any = await ProductService.uploadImage(
            image,
            "product",
            // addProduct._id
            "ABCTest"
          );
          return uploadImage.secure_url;
        })
      );
      // const result: any = await ProductService.uploadImage(
      //   images,
      //   "product",
      //   // product_name
      //   "ABCTest"
      // );
      res.status(200).json({ data });
    } catch (error: any) {
      next(error.message);
    }
  }
}

export default new ProductController();
