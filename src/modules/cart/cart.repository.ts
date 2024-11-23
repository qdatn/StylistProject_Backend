import Cart from "./cart.model";
import CartDto from "./dtos/cart.dto";

class CartRepository {
  async createCart(cartData: CartDto) {
    return await Cart.create(cartData);
  }

  async getAllCart() {
    return await Cart.find().populate("user", "email").populate("products");
  }

  async getCartByUserId(id: string) {
    return await Cart.findOne({ user: id })
      .populate("user", "email")
      .populate("products");
  }

  async updateCart(id: string, updateData: CartDto) {
    const { products } = updateData;
    return await Cart.findOneAndUpdate(
      { user: id },
      { $addToSet: { products: { $each: products } } },
      {
        new: true,
      }
    );
  }

  async addProduct(id: string, product: string) {
    return await Cart.findOneAndUpdate(
      { user: id },
      { $push: { products: product } },
      {
        new: true,
      }
    );
  }

  async deleteCart(id: string) {
    return await Cart.deleteOne({ user: id });
  }

  async deleteProduct(id: string, product: string) {
    return await Cart.findOneAndUpdate(
      { user: id },
      { $pull: { products: product } },
      {
        new: true,
      }
    );
  }
}

export default new CartRepository();
