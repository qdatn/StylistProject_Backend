import { cartRepository } from "../repositories/cartRepo.js";

export const cartService = {
  async createCart(cartData) {
    return await cartRepository.createCart(cartData);
  },

  async getAllCart() {
    return await cartRepository.getAllCart();
  },

  async getCartByUserId(id) {
    return await cartRepository.getCartByUserId(id);
  },

  async updateCart(id, updateData) {
    return await cartRepository.updateCart(id, updateData);
  },

  async deleteCart(id) {
    return await cartRepository.deleteCart(id);
  },
};
