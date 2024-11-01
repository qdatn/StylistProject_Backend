// repositories/orderRepository.js
import { OrderDTO } from "./dtos/order.dto";
import Order from "./order.model";

class OrderRepository {
  async createOrder(data: OrderDTO) {
    return await Order.create(data);
  }

  async getOrderById(id: string) {
    return await Order.findById({ _id: id })
      .populate("user_id")
      .populate("order_items");
  }

  async getAllOrders() {
    return await Order.find().populate("user_id").populate("order_items");
  }

  async updateOrder(id: string, data: OrderDTO) {
    return await Order.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteOrder(id: string) {
    return await Order.findByIdAndDelete({ _id: id });
  }
}

export default new OrderRepository();
