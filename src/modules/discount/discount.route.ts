import { Router } from "express";
import DiscountController from "./discount.controller";
import RouteInterface from "@core/interfaces/route.interface";

class DiscountRoute implements RouteInterface {
  public path = "/api/v1/discount";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, DiscountController.getAllDiscounts);
    this.router.get(`${this.path}/:id`, DiscountController.getDiscountById);
    this.router.post(`${this.path}/`, DiscountController.createDiscount);
    this.router.put(`${this.path}/:id`, DiscountController.updateDiscount);
    this.router.delete(`${this.path}/:id`, DiscountController.deleteDiscount);
  }
}

export default new DiscountRoute();
