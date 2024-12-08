"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_repository_1 = __importDefault(require("./order.repository"));
const orderItem_repository_1 = __importDefault(require("../orderItem/orderItem.repository"));
class OrderService {
    createOrder(orderData, orderItemsData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(orderItemsData)) {
                throw new Error("Order items data must be an array");
            }
            // Step 1: Create the order and get its ID
            const order = yield order_repository_1.default.createOrder(orderData);
            // Step 2: Assign the created order's ID to each order item
            const orderItemsWithOrderId = orderItemsData.map((item) => (Object.assign(Object.assign({}, item), { order: order._id })));
            const order_items = yield orderItem_repository_1.default.createOrderItem(orderItemsWithOrderId);
            return { order, order_items };
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_repository_1.default.getOrderById(id);
        });
    }
    getOrderByUserId(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            // Bước 1: Tìm tất cả các đơn hàng của người dùng
            const orders = yield order_repository_1.default.getOrderByUserId(userid);
            // Bước 2: Với mỗi đơn hàng, lấy các order items tương ứng
            const ordersWithItems = yield Promise.all(orders.map((order) => __awaiter(this, void 0, void 0, function* () {
                const order_items = yield orderItem_repository_1.default.getOrderItemByOrderId(order._id);
                // Trả về thông tin đơn hàng và các order items liên quan
                return {
                    order,
                    order_items,
                };
            })));
            return ordersWithItems;
            // const orderitem = await orderItemRepository.getOrderItemById(order._id);
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_repository_1.default.getAllOrders();
        });
    }
    updateOrder(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_repository_1.default.updateOrder(id, data);
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_repository_1.default.deleteOrder(id);
        });
    }
}
exports.default = new OrderService();
//# sourceMappingURL=order.service.js.map