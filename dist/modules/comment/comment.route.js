"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("./comment.controller"));
class CommentRoute {
    // Constructor
    constructor() {
        this.path = "/api/comment";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, comment_controller_1.default.getAllComments);
        // this.router.get(`${this.path}/search`, CommentController.search); // New search endpoint
        this.router.get(`${this.path}/:id`, comment_controller_1.default.getCommentById);
        this.router.get(`${this.path}/product/:id`, comment_controller_1.default.getCommentByProductId);
        this.router.get(`${this.path}/user/:id`, comment_controller_1.default.getCommentByUserId);
        this.router.post(`${this.path}`, comment_controller_1.default.createComment);
        this.router.put(`${this.path}/:id`, comment_controller_1.default.updateComment);
        this.router.delete(`${this.path}/:id`, comment_controller_1.default.deleteComment);
    }
}
exports.default = new CommentRoute();
//# sourceMappingURL=comment.route.js.map