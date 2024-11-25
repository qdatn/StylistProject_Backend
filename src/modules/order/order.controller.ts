// controllers/orderController.js
import { pagination } from "@core/middlewares";
import OrderService from "./order.service";
import { Request, Response, NextFunction } from "express";
import OrderDTO from "./dtos/order.dto";
import { OrderItemDTO } from "@modules/orderItem";
import { AddressDTO } from "@modules/address";
class OrderController {
  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { order, order_items } = req.body;

      const orderData: OrderDTO = order;
      const orderItemsData: OrderItemDTO[] = order_items;

      const orderDetail = await OrderService.createOrder(
        orderData,
        orderItemsData
      );
      res.status(201).json(orderDetail);
    } catch (error: any) {
      next(error);
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
      next(error);
    }
  }

  async getOrderByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orders = await OrderService.getOrderByUserId(req.params.userid);
      if (!orders) {
        res.status(404).json({ message: "Order not found" });
      } else {
        await pagination(req, res, orders, next);
        // res.status(200).json(orders);
        res.status(200).json(res.locals.pagination);
      }
    } catch (error: any) {
      next(error);
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
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      next(error);
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
      next(error);
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
      next(error);
    }
  }
}

export default new OrderController();
