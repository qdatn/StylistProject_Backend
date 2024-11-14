import { pagination } from "@core/middlewares";
import ProductService from "@modules/product/product.service";
import { Request, Response, NextFunction } from "express";

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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
    }
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
    }
  }
}

export default new ProductController();
