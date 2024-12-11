// services/orderService.js
import mongoose from "mongoose";
import OrderDTO from "./dtos/order.dto";
import orderRepository from "./order.repository";
import { OrderItemDTO } from "@modules/orderItem";
import orderItemRepository from "@modules/orderItem/orderItem.repository";
import IOrder from "./order.interface";
import { AddressDTO, AddressRepository } from "@modules/address";

class OrderService {
  async createOrder(orderData: OrderDTO, orderItemsData: OrderItemDTO[]) {
    if (!Array.isArray(orderItemsData)) {
      throw new Error("Order items data must be an array");
    }
    // Step 1: Create the order and get its ID
    const order = await orderRepository.createOrder(orderData);

    // Step 2: Assign the created order's ID to each order item
    const orderItemsWithOrderId = orderItemsData.map((item: OrderItemDTO) => ({
      ...item,
      order: order._id,
      // product: item.product,
      // quantity: item.quantity,
      // attributes: item.attributes,
      // note: item.note,
      // product: new mongoose.Types.ObjectId(item.product),
    }));
    const order_items = await orderItemRepository.createOrderItem(
      orderItemsWithOrderId
    );

    return { order, order_items };
  }

  async getOrderById(id: string) {
    return await orderRepository.getOrderById(id);
  }
  async getOrderByUserId(userid: string) {
    // Bước 1: Tìm tất cả các đơn hàng của người dùng
    const orders: any = await orderRepository.getOrderByUserId(userid);

    // Bước 2: Với mỗi đơn hàng, lấy các order items tương ứng
    const ordersWithItems = await Promise.all(
      orders.map(async (order: any) => {
        const order_items = await orderItemRepository.getOrderItemByOrderId(
          order._id
        );

        // Trả về thông tin đơn hàng và các order items liên quan
        return {
          order,
          order_items,
        };
      })
    );
    return ordersWithItems;
    // const orderitem = await orderItemRepository.getOrderItemById(order._id);
  }

  async getAllOrders() {
    return await orderRepository.getAllOrders();
  }

  async updateOrder(id: string, data: OrderDTO) {
    return await orderRepository.updateOrder(id, data);
  }

  async deleteOrder(id: string) {
    const order = await orderRepository.deleteOrder(id);  
    const order_items = await orderItemRepository.deleteOrderItemByOrderId(id);
    return order;
  }
}

export default new OrderService();
