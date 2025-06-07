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
const orderItem_model_1 = __importDefault(require("./orderItem.model"));
class OrderItemRepository {
    createOrderItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_model_1.default.create(data);
        });
    }
    getOrderItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_model_1.default.findById(id)
                .populate("product")
                .sort({ createdAt: -1 });
        });
    }
    getOrderItemByOrderId(order) {
        return __awaiter(this, void 0, void 0, function* () {
            //const id = new mongoose.Types.ObjectId(order);
            return yield orderItem_model_1.default.find({ order: order })
                .populate("product")
                .sort({ createdAt: -1 });
        });
    }
    getAllOrderItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_model_1.default.find().populate("product").sort({ createdAt: -1 });
        });
    }
    updateOrderItem(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_model_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
        });
    }
    deleteOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_model_1.default.findOneAndDelete({ _id: id });
        });
    }
    deleteOrderItemByOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItem_model_1.default.deleteMany({ order: id });
        });
    }
}
exports.default = new OrderItemRepository();
//# sourceMappingURL=orderItem.repository.js.map