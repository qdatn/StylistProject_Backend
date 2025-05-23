// repositories/orderItemRepository.js
import mongoose from "mongoose";
import OrderItemDTO from "./dtos/orderItem.dto";
import OrderItem from "./orderItem.model";

class OrderItemRepository {
  async createOrderItem(data: OrderItemDTO[]) {
    return await OrderItem.create(data);
  }

  async getOrderItemById(id: string) {
    return await OrderItem.findById(id).populate("product");
  }

  async getOrderItemByOrderId(order: string) {
    //const id = new mongoose.Types.ObjectId(order);
    return await OrderItem.find({ order: order }).populate("product");
  }

  async getAllOrderItems() {
    return await OrderItem.find().populate("product");
  }

  async updateOrderItem(id: string, data: OrderItemDTO) {
    return await OrderItem.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteOrderItem(id: string) {
    return await OrderItem.findOneAndDelete({ _id: id });
  }

  async deleteOrderItemByOrderId(id: string) {
    return await OrderItem.deleteMany({ order: id });
  }
}

export default new OrderItemRepository();
