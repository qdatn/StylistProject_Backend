"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statistic_controller_1 = __importDefault(require("./statistic.controller"));
class StatisticRoute {
    // Constructor
    constructor() {
        this.path = "/api/statistic";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, statistic_controller_1.default.getProAndOrderStatistics);
        this.router.get(`${this.path}/revenue`, statistic_controller_1.default.getRevenueByDate);
        this.router.get(`${this.path}/order`, statistic_controller_1.default.getOrdersByDate);
        // this.router.get(`${this.path}/order`, StatisticController.fetchOrdersByDateRange);
    }
}
exports.default = new StatisticRoute();
//# sourceMappingURL=statistic.route.js.map