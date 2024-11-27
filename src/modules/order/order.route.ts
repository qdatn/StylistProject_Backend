import { Router } from "express";
import OrderController from "./order.controller";
import RouteInterface from "@core/interfaces/route.interface";

class OrderItemRoute implements RouteInterface {
  public path = "/api/order";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, OrderController.createOrder);
    this.router.get(`${this.path}/`, OrderController.getAllOrders);
    this.router.get(`${this.path}/:id`, OrderController.getOrderById);
    this.router.get(`${this.path}/user/:userid`, OrderController.getOrderByUserId);
    this.router.put(`${this.path}/:id`, OrderController.updateOrder);
    this.router.delete(`${this.path}/:id`, OrderController.deleteOrder);
  }
}

export default new OrderItemRoute();
