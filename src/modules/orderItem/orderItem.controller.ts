// controllers/orderItemController.js
import { Request, Response, NextFunction } from "express";
import orderItemService from "./orderItem.service";
import { pagination } from "@core/middlewares";

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
      next(error);
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
      } else {
        res.status(200).json(orderItem);
      }
    } catch (error: any) {
      next(error);
    }
  }

  async getAllOrderItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orderItems = await orderItemService.getAllOrderItems();
      await pagination(req, res, orderItems, next);
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      next(error);
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
      } else {
        res.status(200).json(orderItem);
      }
    } catch (error: any) {
      next(error);
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
      } else {
        res.status(200).json({ message: "Order item deleted successfully" });
      }
    } catch (error: any) {
      next(error);
    }
  }
}

export default new OrderItemController();
