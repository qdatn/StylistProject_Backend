"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../auth/auth.controller"));
const auth_middleware_1 = __importDefault(require("../../core/middlewares/auth.middleware"));
class AuthRoute {
    // Constructor
    constructor() {
        this.path = "/api/auth";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, auth_controller_1.default.register);
        this.router.post(`${this.path}/login`, auth_controller_1.default.login);
        this.router.post(`${this.path}/logout`, auth_controller_1.default.logout);
        this.router.put(`${this.path}/change-password`, auth_controller_1.default.changePassword);
        this.router.put(`${this.path}/:id`, auth_middleware_1.default, auth_controller_1.default.updateUser);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, auth_controller_1.default.deleteUser);
        this.router.get(`${this.path}/send-verification`, auth_controller_1.default.sendVerification);
        this.router.post(`${this.path}/verify`, auth_controller_1.default.verifyOTP);
        this.router.post(`${this.path}/check-email`, auth_controller_1.default.checkEmail);
    }
}
exports.default = new AuthRoute();
//# sourceMappingURL=auth.route.js.map