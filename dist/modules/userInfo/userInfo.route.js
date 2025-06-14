"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userInfo_controller_1 = __importDefault(require("../userInfo/userInfo.controller"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
class UserInfoRoute {
    // Constructor
    constructor() {
        this.path = "/api/userinfo";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, userInfo_controller_1.default.getAllUserInfo); // Lấy tất cả UserInfo
        this.router.get(`${this.path}/:id`, userInfo_controller_1.default.getUserInfoById); // Lấy UserInfo theo user_id
        this.router.post(`${this.path}/`, userInfo_controller_1.default.createUserInfo); // Tạo UserInfo mới
        this.router.post(`${this.path}/upload-body-shape-image`, upload.single("file"), userInfo_controller_1.default.uploadBodyShapeImage);
        this.router.put(`${this.path}/:id`, userInfo_controller_1.default.updateUserInfo); // Cập nhật UserInfo theo ID
        this.router.delete(`${this.path}/:id`, userInfo_controller_1.default.deleteUserInfo); // Xóa UserInfo theo ID
        // this.router.put(`${this.path}/:id`, AuthController.updateUser);
        // this.router.delete(`${this.path}/:id`, AuthController.deleteUser);
    }
}
exports.default = new UserInfoRoute();
//# sourceMappingURL=userInfo.route.js.map