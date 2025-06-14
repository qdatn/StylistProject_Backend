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
const cart_model_1 = __importDefault(require("./cart.model"));
class CartRepository {
    createCart(cartData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.create(cartData);
        });
    }
    getAllCart() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.find()
                .populate("user", "email")
                .populate("products")
                .sort({ createdAt: -1 });
        });
    }
    getCartByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.findOne({ user: id })
                .populate("user", "email")
                .populate("products")
                .sort({ createdAt: -1 });
        });
    }
    updateCart(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products } = updateData;
            return yield cart_model_1.default.findOneAndUpdate({ user: id }, { $addToSet: { products: { $each: products } } }, {
                new: true,
            });
        });
    }
    addProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.findOneAndUpdate({ user: id }, { $push: { products: product } }, {
                new: true,
            });
        });
    }
    deleteCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.deleteOne({ user: id });
        });
    }
    deleteProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.findOneAndUpdate({ user: id }, { $pull: { products: product } }, {
                new: true,
            });
        });
    }
}
exports.default = new CartRepository();
//# sourceMappingURL=cart.repository.js.map