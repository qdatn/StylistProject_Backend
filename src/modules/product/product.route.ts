import { Router } from "express";
import ProductController from "@modules/product/product.controller";
import RouteInterface from "@core/interfaces/route.interface";

class ProductRoute implements RouteInterface {
  public path = "/api/v1/product";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, ProductController.getAllProducts);
    this.router.get(`${this.path}/:id`, ProductController.getProductById);
    this.router.post(`${this.path}/insertOne`, ProductController.createProduct);
    this.router.post(
      `${this.path}/insertMany`,
      ProductController.createManyProducts
    );
    this.router.put(`${this.path}/update/:id`, ProductController.updateProduct);
    this.router.delete(
      `${this.path}/delete/:id`,
      ProductController.deleteProduct
    );
  }
}

export default new ProductRoute();
