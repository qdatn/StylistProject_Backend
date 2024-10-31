import { Router } from "express";
import CartController from "./cart.controller";
import RouteInterface from "@core/interfaces/route.interface";

class CartRoute implements RouteInterface {
  public path = "/api/v1/cart";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, CartController.getAllCart);
    this.router.get(`${this.path}/:userid`, CartController.getCartByUserId);
    this.router.post(`${this.path}/`, CartController.createCart);
    this.router.put(`${this.path}/update/:userid`, CartController.updateCart);
    this.router.put(
      `${this.path}/addProduct/:userid`,
      CartController.addProduct
    );
    this.router.delete(
      `${this.path}/delete/:userid`,
      CartController.deleteCart
    );
    this.router.put(
      `${this.path}/deleteProduct/:userid`,
      CartController.deleteProduct
    );
  }
}

export default new CartRoute();
