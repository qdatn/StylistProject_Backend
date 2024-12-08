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
const comment_repository_1 = __importDefault(require("./comment.repository"));
class CommentService {
    createComment(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_repository_1.default.create(commentData);
        });
    }
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_repository_1.default.findAll();
        });
    }
    getCommentById(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_repository_1.default.findByCommentId(commentId);
            if (!comment)
                throw new Error("Comment not found");
            return comment;
        });
    }
    getCommentByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_repository_1.default.findByProductId(productId);
            if (!comment)
                throw new Error("Comment not found");
            return comment;
        });
    }
    getCommentByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_repository_1.default.findByUserId(userId);
            if (!comment)
                throw new Error("Comment not found");
            return comment;
        });
    }
    updateComment(commentId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_repository_1.default.update(commentId, updateData);
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_repository_1.default.delete(commentId);
            if (!comment)
                throw new Error("Comment not found");
            return comment;
        });
    }
}
exports.default = new CommentService();
//# sourceMappingURL=comment.service.js.map