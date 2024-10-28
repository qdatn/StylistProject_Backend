import { cartService } from "../services/cartService.js";

export const cartController = {
  async createCart(req, res) {
    try {
      const cart = await cartService.createCart(req.body);
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllCart(req, res) {
    try {
      const cart = await cartService.getAllCart();
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCartByUserId(req, res) {
    try {
      const cart = await cartService.getCartByUserId(req.params.id);
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCart(req, res) {
    try {
      const cart = await cartService.updateCart(req.params.id, req.body);
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCart(req, res) {
    try {
      const cart = await cartService.deleteCart(req.params.id);
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      res.json({ message: "Cart deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
