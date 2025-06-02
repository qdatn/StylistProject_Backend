import { pagination } from "@core/middlewares";
import { deleteImage, uploadImage } from "@core/utils";
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
      if (error.status === 409) {
        res.status(409).json({ message: error.message });
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
      const image: any = req.file;
      const { id } = req.params;
      const result = await ProductService.uploadImage(image, "product", id);
      res.status(200).json({ imageUrl: result });
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
}

export default new ProductController();
