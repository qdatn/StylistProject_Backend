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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../../core/middlewares");
const comment_service_1 = __importDefault(require("./comment.service"));
class CommentController {
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_service_1.default.createComment(req.body);
                res.status(201).json(comment);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getAllComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_service_1.default.getAllComments();
                // Pagination for object comment data got from api getAll
                yield (0, middlewares_1.pagination)(req, res, comments, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getCommentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_service_1.default.getCommentById(req.params.id);
                res.status(200).json(comment);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCommentByProductId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_service_1.default.getCommentByProductId(req.params.id);
                yield (0, middlewares_1.pagination)(req, res, comments, next);
                res.status(200).json(res.locals.pagination);
                // res.status(200).json(comments);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCommentByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_service_1.default.getCommentByUserId(req.params.id);
                res.status(200).json(comment);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedComment = yield comment_service_1.default.updateComment(req.params.id, req.body);
                res.status(200).json(updatedComment);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield comment_service_1.default.deleteComment(req.params.id);
                res.status(200).send({ message: "Comment deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new CommentController();
//# sourceMappingURL=comment.controller.js.map