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
const order_model_1 = __importDefault(require("./order.model"));
class OrderRepository {
    createOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_model_1.default.create(data);
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_model_1.default.findById({ _id: id })
                .populate("user", "email")
                .populate("address")
                .sort({ createdAt: -1 });
        });
    }
    getOrderByUserId(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            // const _id = new mongoose.Types.ObjectId(userid);
            return yield order_model_1.default.find({ user: userid })
                .populate("user", "email")
                .populate("address")
                .sort({ createdAt: -1 });
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_model_1.default.find().populate("user", "email").sort({ createdAt: -1 });
        });
    }
    updateOrder(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_model_1.default.findByIdAndUpdate({ _id: id }, data, { new: true });
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_model_1.default.findByIdAndDelete({ _id: id });
        });
    }
}
exports.default = new OrderRepository();
//# sourceMappingURL=order.repository.js.map