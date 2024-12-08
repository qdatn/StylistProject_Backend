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
const cart_service_1 = __importDefault(require("./cart.service"));
class CartController {
    createCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_service_1.default.createCart(req.body);
                res.status(201).json(cart);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield cart_service_1.default.getAllCart();
                if (!carts) {
                    res.status(404).json({ message: "Cart not found" });
                }
                else {
                    yield (0, middlewares_1.pagination)(req, res, carts, next);
                    res.status(200).json(res.locals.pagination);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCartByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_service_1.default.getCartByUserId(req.params.userid);
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                }
                else {
                    res.status(200).json(cart);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_service_1.default.updateCart(req.params.userid, req.body);
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                }
                else {
                    res.status(200).json(cart);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    addProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_service_1.default.addProduct(req.params.userid, req.body.product);
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                }
                else {
                    res.status(200).json(cart);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_service_1.default.deleteCart(req.params.userid);
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                }
                else {
                    res.status(200).json({ message: "Cart deleted successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_service_1.default.deleteProduct(req.params.userid, req.body.product);
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                }
                else {
                    res.status(200).json(cart);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new CartController();
//# sourceMappingURL=cart.controller.js.map