// services/orderItemService.js
import orderItemRepository from "./orderItem.repository";
import OrderItemDTO from "./dtos/orderItem.dto.js";

class OrderItemService {
  async createOrderItem(data: OrderItemDTO) {
    return await orderItemRepository.createOrderItem(data);
  }

  async getOrderItemById(id: string) {
    return await orderItemRepository.getOrderItemById(id);
  }

  async getAllOrderItems() {
    return await orderItemRepository.getAllOrderItems();
  }

  async updateOrderItem(id: string, data: OrderItemDTO) {
    return await orderItemRepository.updateOrderItem(id, data);
  }

  async deleteOrderItem(id: string) {
    return await orderItemRepository.deleteOrderItem(id);
  }
}

export default new OrderItemService();