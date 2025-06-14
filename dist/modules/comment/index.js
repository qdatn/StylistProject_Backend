"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDto = exports.CommentRoute = exports.CommentController = exports.CommentService = exports.CommentRepository = exports.Comment = void 0;
const comment_model_1 = __importDefault(require("./comment.model"));
exports.Comment = comment_model_1.default;
const comment_model_2 = __importDefault(require("./comment.model"));
exports.CommentRepository = comment_model_2.default;
const comment_service_1 = __importDefault(require("./comment.service"));
exports.CommentService = comment_service_1.default;
const comment_controller_1 = __importDefault(require("./comment.controller"));
exports.CommentController = comment_controller_1.default;
const comment_route_1 = __importDefault(require("./comment.route"));
exports.CommentRoute = comment_route_1.default;
// import IComment from "./comment.interface";
const comment_dto_1 = __importDefault(require("./dtos/comment.dto"));
exports.CommentDto = comment_dto_1.default;
//# sourceMappingURL=index.js.map