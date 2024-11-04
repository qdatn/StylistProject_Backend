// services/orderService.js
import OrderDTO from "./dtos/order.dto";
import orderRepository from "./order.repository";

class OrderService {
  async createOrder(data: OrderDTO) {
    return await orderRepository.createOrder(data);
  }

  async getOrderById(id: string) {
    return await orderRepository.getOrderById(id);
  }

  async getAllOrders() {
    return await orderRepository.getAllOrders();
  }

  async updateOrder(id: string, data: OrderDTO) {
    return await orderRepository.updateOrder(id, data);
  }

  async deleteOrder(id: string) {
    return await orderRepository.deleteOrder(id);
  }
}

export default new OrderService();
