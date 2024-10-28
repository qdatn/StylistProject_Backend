import Cart from "../models/cartModel.js";

export const cartRepository = {
  async createCart(cartData) {
    return await Cart.create(cartData);
  },

  async getAllCart() {
    return await Cart.find().populate("user").populate("products");
  },

  async getCartByUserId(id) {
    return await Cart.findOne({ user: id })
      .populate("user")
      .populate("products");
  },

  async updateCart(id, updateData) {
    return await Cart.findOneAndUpdate({ user: id }, updateData, {
      new: true,
    });
  },

  async deleteCart(id) {
    return await Cart.deleteOne({ user: id });
  },
};
