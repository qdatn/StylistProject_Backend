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

  async addProduct(id: string, product: string) {
    return await CartRepository.addProduct(id, product);
  }

  async deleteCart(id: string) {
    return await CartRepository.deleteCart(id);
  }

  async deleteProduct(id: string, product: string) {
    return await CartRepository.deleteProduct(id, product);
  }
}

export default new CartService();
