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
// controllers/orderController.js
const middlewares_1 = require("../../core/middlewares");
const order_service_1 = __importDefault(require("./order.service"));
class OrderController {
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { order, order_items } = req.body;
                const orderData = order;
                const orderItemsData = order_items;
                const orderDetail = yield order_service_1.default.createOrder(orderData, orderItemsData);
                res.status(201).json(orderDetail);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOrderById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_service_1.default.getOrderById(req.params.id);
                if (!order) {
                    res.status(404).json({ message: "Order not found" });
                }
                res.status(200).json(order);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOrderByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_service_1.default.getOrderByUserId(req.params.userid);
                if (!orders) {
                    res.status(404).json({ message: "Order not found" });
                }
                else {
                    yield (0, middlewares_1.pagination)(req, res, orders, next);
                    // res.status(200).json(orders);
                    res.status(200).json(res.locals.pagination);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_service_1.default.getAllOrders();
                yield (0, middlewares_1.pagination)(req, res, orders, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_service_1.default.updateOrder(req.params.id, req.body);
                if (!order) {
                    res.status(404).json({ message: "Order not found" });
                }
                res.status(200).json(order);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_service_1.default.deleteOrder(req.params.id);
                if (!order) {
                    res.status(404).json({ message: "Order not found" });
                }
                res.status(200).json({ message: "Order deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new OrderController();
//# sourceMappingURL=order.controller.js.map