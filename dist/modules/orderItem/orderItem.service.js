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
// services/orderItemService.js
const orderItem_repository_1 = __importDefault(require("./orderItem.repository"));
class OrderItemService {
    createOrderItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_repository_1.default.createOrderItem(data);
        });
    }
    getOrderItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_repository_1.default.getOrderItemById(id);
        });
    }
    getOrderItemByOrderId(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_repository_1.default.getOrderItemByOrderId(order);
        });
    }
    getAllOrderItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_repository_1.default.getAllOrderItems();
        });
    }
    updateOrderItem(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_repository_1.default.updateOrderItem(id, data);
        });
    }
    deleteOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_repository_1.default.deleteOrderItem(id);
        });
    }
    deleteOrderItemByOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_repository_1.default.deleteOrderItemByOrderId(id);
        });
    }
}
exports.default = new OrderItemService();
//# sourceMappingURL=orderItem.service.js.map