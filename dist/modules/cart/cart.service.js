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
const cart_repository_1 = __importDefault(require("./cart.repository"));
class CartService {
    createCart(cartData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.createCart(cartData);
        });
    }
    getAllCart() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.getAllCart();
        });
    }
    getCartByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.getCartByUserId(id);
        });
    }
    updateCart(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.updateCart(id, updateData);
        });
    }
    addProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.addProduct(id, product);
        });
    }
    deleteCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.deleteCart(id);
        });
    }
    deleteProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.deleteProduct(id, product);
        });
    }
}
exports.default = new CartService();
//# sourceMappingURL=cart.service.js.map