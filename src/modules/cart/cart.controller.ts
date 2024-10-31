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
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.getAllCart();
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      }
      res.json(cart);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.getCartByUserId(req.params.id);
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      }
      res.json(cart);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.updateCart(req.params.id, req.body);
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      }
      res.json(cart);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await CartService.deleteCart(req.params.id);
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      }
      res.json({ message: "Cart deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CartController();
