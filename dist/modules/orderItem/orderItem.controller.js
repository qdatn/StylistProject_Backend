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
const orderItem_service_1 = __importDefault(require("./orderItem.service"));
const middlewares_1 = require("../../core/middlewares");
class OrderItemController {
    createOrderItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderItem = yield orderItem_service_1.default.createOrderItem(req.body);
                res.status(201).json(orderItem);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOrderItemById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderItem = yield orderItem_service_1.default.getOrderItemById(req.params.id);
                if (!orderItem) {
                    res.status(404).json({ message: "Order item not found" });
                }
                else {
                    res.status(200).json(orderItem);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOrderItemByOrderId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderItem = yield orderItem_service_1.default.getOrderItemByOrderId(req.params.order);
                if (!orderItem) {
                    res.status(404).json({ message: "Order item not found" });
                }
                else {
                    res.status(200).json(orderItem);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllOrderItems(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderItems = yield orderItem_service_1.default.getAllOrderItems();
                yield (0, middlewares_1.pagination)(req, res, orderItems, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateOrderItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderItem = yield orderItem_service_1.default.updateOrderItem(req.params.id, req.body);
                if (!orderItem) {
                    res.status(404).json({ message: "Order item not found" });
                }
                else {
                    res.status(200).json(orderItem);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOrderItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderItem = yield orderItem_service_1.default.deleteOrderItem(req.params.id);
                if (!orderItem) {
                    res.status(404).json({ message: "Order item not found" });
                }
                else {
                    res.status(200).json({ message: "Order item deleted successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new OrderItemController();
//# sourceMappingURL=orderItem.controller.js.map