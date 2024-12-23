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
const orderItem_1 = require("../orderItem");
const product_1 = require("../product");
class StatisticService {
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
    getStatistics(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Tổng tiền đơn hàng trong khoảng thời gian
            const totalRevenue = yield order_1.Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate),
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$total_price" },
                    },
                },
            ]);
            // Tổng sản phẩm đã bán
            // const totalSoldProducts = await Product.aggregate([
            //   {
            //     $group: {
            //       _id: null,
            //       total: { $sum: "$sold_quantity" },
            //     },
            //   },
            // ]);
            const totalSoldProducts = yield orderItem_1.OrderItem.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate),
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            // Tổng số đơn
            const totalOrders = yield order_1.Order.countDocuments({
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            });
            // Tổng số sản phẩm
            const totalProducts = yield product_1.Product.countDocuments({
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            });
            return {
                totalRevenue: ((_a = totalRevenue[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
                // totalSoldProducts: totalSoldProducts[0]?.total || 0,
                totalSoldProducts: ((_b = totalSoldProducts[0]) === null || _b === void 0 ? void 0 : _b.total) || 0,
                totalOrders,
                totalProducts,
            };
        });
    }
    getOrdersByDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_1.Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
                        averageTotalPrice: { $avg: "$total_price" }, // Tính giá trị trung bình của total_price
                    },
                },
                {
                    $project: {
                        _id: 1,
                        averageTotalPrice: { $round: ["$averageTotalPrice", 2] }, // Làm tròn 2 chữ số thập phân
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
            const dailyRevenue = yield order_1.Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
                        totalRevenue: { $sum: "$total_price" }, // Tổng doanh thu theo ngày
                        totalOrders: { $sum: 1 }, // Số lượng đơn hàng trong ngày
                    },
                },
                {
                    $sort: { _id: 1 }, // Sắp xếp theo ngày tăng dần
                },
            ]);
            const dailyOrderCounts = yield order_1.Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
                        orderCount: { $sum: 1 }, // Đếm số lượng đơn hàng trong mỗi ngày
                    },
                },
                {
                    $sort: { _id: 1 }, // Sắp xếp theo ngày tăng dần
                },
            ]);
            return {
                orders,
                // totalRevenue: totalRevenue[0]?.totalRevenue || 0,
                dailyRevenue,
                dailyOrderCounts,
            };
        });
    }
    getOrdersByDate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_1.Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    },
                },
                // {
                //   $group: {
                //     _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
                //     averageTotalPrice: { $avg: "$total_price" }, // Tính giá trị trung bình của total_price
                //   },
                // },
                // {
                //   $sort: { _id: 1 },
                // },
            ]);
            return { orders };
        });
    }
}
exports.default = new StatisticService();
//# sourceMappingURL=statistic.service.js.map