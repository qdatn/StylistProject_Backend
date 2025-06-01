"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const style_controller_1 = __importDefault(require("../style_preference/style.controller"));
class StylePreferenceRoute {
    // Constructor
    constructor() {
        this.path = "/api/style-preferences";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, style_controller_1.default.getAll);
        this.router.get(`${this.path}/:id`, style_controller_1.default.getById);
        this.router.post(`${this.path}/`, style_controller_1.default.create);
        this.router.put(`${this.path}/:id`, style_controller_1.default.update);
        this.router.delete(`${this.path}/:id`, style_controller_1.default.delete);
    }
}
exports.default = new StylePreferenceRoute();
//# sourceMappingURL=style.route.js.map