// controllers/orderItemController.js
import { Request, Response, NextFunction } from "express";
import orderItemService from "./orderItem.service";

class OrderItemController {
  async createOrderItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orderItem = await orderItemService.createOrderItem(req.body);
      res.status(201).json(orderItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderItemById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orderItem = await orderItemService.getOrderItemById(req.params.id);
      if (!orderItem) {
        res.status(404).json({ message: "Order item not found" });
      }
      res.status(200).json(orderItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllOrderItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orderItems = await orderItemService.getAllOrderItems();
      res.status(200).json(orderItems);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOrderItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orderItem = await orderItemService.updateOrderItem(
        req.params.id,
        req.body
      );
      if (!orderItem) {
        res.status(404).json({ message: "Order item not found" });
      }
      res.status(200).json(orderItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteOrderItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orderItem = await orderItemService.deleteOrderItem(req.params.id);
      if (!orderItem) {
        res.status(404).json({ message: "Order item not found" });
      }
      res.status(200).json({ message: "Order item deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new OrderItemController();