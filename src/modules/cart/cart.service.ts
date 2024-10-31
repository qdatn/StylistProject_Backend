import CartRepository from "./cart.repository";
import CartDto from "./dtos/cart.dto.js";

class CartService {
  async createCart(cartData: CartDto) {
    return await CartRepository.createCart(cartData);
  }

  async getAllCart() {
    return await CartRepository.getAllCart();
  }

  async getCartByUserId(id: string) {
    return await CartRepository.getCartByUserId(id);
  }

  async updateCart(id: string, updateData: CartDto) {
    return await CartRepository.updateCart(id, updateData);
  }

  async deleteCart(id: string) {
    return await CartRepository.deleteCart(id);
  }
}

export default new CartService();
