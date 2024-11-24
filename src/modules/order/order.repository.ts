// repositories/orderRepository.js
import mongoose from "mongoose";
import OrderDTO from "./dtos/order.dto";
import Order from "./order.model";

class OrderRepository {
  async createOrder(data: OrderDTO) {
    return await Order.create(data);
  }

  async getOrderById(id: string) {
    return await Order.findById({ _id: id }).populate("user", "email");
  }

  async getOrderByUserId(userid: string) {
    // const _id = new mongoose.Types.ObjectId(userid);
    return await Order.find({ user: userid }).populate("user", "email");
  }

  async getAllOrders() {
    return await Order.find().populate("user", "email");
  }

  async updateOrder(id: string, data: OrderDTO) {
    return await Order.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteOrder(id: string) {
    return await Order.findByIdAndDelete({ _id: id });
  }
}

export default new OrderRepository();
