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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const product_1 = require("../product");
const _1 = require(".");
class StatisticController {
    getProAndOrderStatistics(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Tổng tiền đơn hàng
            const totalRevenue = yield order_1.Order.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$total_price" },
                    },
                },
            ]);
            // Tổng sản phẩm đã bán
            const totalSoldProducts = yield product_1.Product.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$sold_quantity" },
                    },
                },
            ]);
            // Tổng số đơn
            const totalOrders = yield order_1.Order.countDocuments();
            // Tổng số sản phẩm
            const totalProducts = yield product_1.Product.countDocuments();
            res.status(200).json({
                totalRevenue: ((_a = totalRevenue[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
                totalSoldProducts: ((_b = totalSoldProducts[0]) === null || _b === void 0 ? void 0 : _b.total) || 0,
                totalOrders,
                totalProducts,
            });
        });
    }
    getRevenueByDate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = req.query;
                if (!startDate || !endDate) {
                    next({
                        success: false,
                        message: "Start date and end date are required.",
                    });
                }
                // Chuyển đổi sang kiểu Date
                const start = new Date(startDate);
                const end = new Date(endDate);
                const statistics = yield _1.StatisticService.getStatistics(start, end);
                res.status(200).json({
                    success: true,
                    data: statistics,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    fetchOrdersByDateRange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, endDate } = req.query;
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (!startDate || !endDate) {
                next({ message: "Start date and end date are required" });
            }
            try {
                const { orders, dailyRevenue, dailyOrderCounts } = yield _1.StatisticService.getOrdersByDateRange(start, end);
                res.status(200).json({ orders, dailyRevenue, dailyOrderCounts });
            }
            catch (error) {
                next({ message: error.message });
            }
        });
    }
    getOrdersByDate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, endDate } = req.query;
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (!startDate || !endDate) {
                next({ message: "Start date and end date are required" });
            }
            try {
                const { orders } = yield _1.StatisticService.getOrdersByDate(start, end);
                res.status(200).json({ orders });
            }
            catch (error) {
                next({ message: error.message });
            }
        });
    }
}
exports.default = new StatisticController();
//# sourceMappingURL=statistic.controller.js.map