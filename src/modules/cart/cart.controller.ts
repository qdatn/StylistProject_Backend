import { pagination } from "@core/middlewares";
import CartService from "./cart.service";
import { Request, Response, NextFunction } from "express";

class CartController {
  async createCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.createCart(req.body);
      res.status(201).json(cart);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const carts = await CartService.getAllCart();
      if (!carts) {
        res.status(404).json({ message: "Cart not found" });
      } else {
        await pagination(req, res, carts, next);
        res.status(200).json(res.locals.pagination);
      }
    } catch (error: any) {
      next(error);
    }
  }

  async getCartByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.getCartByUserId(req.params.userid);
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      } else {
        res.status(200).json(cart);
      }
    } catch (error: any) {
      next(error);
    }
  }

  async updateCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.updateCart(req.params.userid, req.body);
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      } else {
        res.status(200).json(cart);
      }
    } catch (error: any) {
      next(error);
    }
  }

  async addProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.addProduct(
        req.params.userid,
        req.body.product
      );
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      } else {
        res.status(200).json(cart);
      }
    } catch (error: any) {
      next(error);
    }
  }

  async deleteCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.deleteCart(req.params.userid);
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      } else {
        res.status(200).json({ message: "Cart deleted successfully" });
      }
    } catch (error: any) {
      next(error);
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.deleteProduct(
        req.params.userid,
        req.body.product
      );
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      } else {
        res.status(200).json(cart);
      }
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CartController();
