"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = __importDefault(require("./address.controller"));
class AttributeRoute {
    // Constructor
    constructor() {
        this.path = "/api/address";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/`, address_controller_1.default.createAddress);
        this.router.get(`${this.path}/`, address_controller_1.default.getAllAddresses);
        this.router.get(`${this.path}/user/:userid`, address_controller_1.default.getAddressUserById);
        this.router.get(`${this.path}/:id`, address_controller_1.default.getAddressById);
        this.router.put(`${this.path}/:id`, address_controller_1.default.updateAddress);
        this.router.delete(`${this.path}/:id`, address_controller_1.default.deleteAddress);
    }
}
exports.default = new AttributeRoute();
//# sourceMappingURL=address.route.js.map