// controllers/orderController.js
import { pagination } from "@core/middlewares";
import OrderService from "./order.service";
import { Request, Response, NextFunction } from "express";
class OrderController {
  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orders = await OrderService.getAllOrders();
      await pagination(req, res, orders, next);
      res.json(res.locals.pagination);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const order = await OrderService.updateOrder(req.params.id, req.body);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const order = await OrderService.deleteOrder(req.params.id);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new OrderController();
