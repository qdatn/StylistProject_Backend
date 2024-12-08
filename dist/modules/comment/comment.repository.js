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
const comment_model_1 = __importDefault(require("./comment.model"));
class CommentRepository {
    create(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = new comment_model_1.default(commentData);
            return yield comment.save();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_model_1.default.find().populate("product").populate("user", "email");
        });
    }
    findByCommentId(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_model_1.default.find({ _id: commentId })
                .populate("product")
                .populate("user");
        });
    }
    findByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_model_1.default.find({ product: productId })
                // .populate("product")
                .populate("user_info");
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_model_1.default.find({ user: userId })
                .populate("product")
                .populate("user", "email");
        });
    }
    update(commentId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_model_1.default.findByIdAndUpdate(commentId, updateData, {
                new: true,
            });
        });
    }
    delete(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_model_1.default.findByIdAndDelete(commentId);
        });
    }
}
exports.default = new CommentRepository();
//# sourceMappingURL=comment.repository.js.map