import { Router } from "express";
import OrderItemController from "./orderItem.controller";
import RouteInterface from "@core/interfaces/route.interface";

class OrderItemRoute implements RouteInterface {
  public path = "/api/v1/orderitem";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, OrderItemController.createOrderItem);
    this.router.get(`${this.path}/`, OrderItemController.getAllOrderItems);
    this.router.get(`${this.path}/:id`, OrderItemController.getOrderItemById);
    this.router.put(`${this.path}/:id`, OrderItemController.updateOrderItem);
    this.router.delete(`${this.path}/:id`, OrderItemController.deleteOrderItem);
  }
}

export default new OrderItemRoute();
