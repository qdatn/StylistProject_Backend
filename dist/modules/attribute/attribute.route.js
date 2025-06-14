"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attribute_controller_1 = __importDefault(require("./attribute.controller"));
class AttributeRoute {
    // Constructor
    constructor() {
        this.path = "/api/attribute";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/`, attribute_controller_1.default.createAttribute);
        this.router.get(`${this.path}/`, attribute_controller_1.default.getAllAttributes);
        this.router.get(`${this.path}/:key`, attribute_controller_1.default.getAttributeByKey);
        this.router.put(`${this.path}/:key`, attribute_controller_1.default.updateAttribute);
        this.router.delete(`${this.path}/:key`, attribute_controller_1.default.deleteAttribute);
        this.router.put(`${this.path}/:key/addValues`, attribute_controller_1.default.addValue);
        this.router.put(`${this.path}/:key/deleteValues`, attribute_controller_1.default.deleteValue);
    }
}
exports.default = new AttributeRoute();
//# sourceMappingURL=attribute.route.js.map