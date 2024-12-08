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
const discount_service_1 = __importDefault(require("./discount.service"));
const middlewares_1 = require("../../core/middlewares");
class DiscountController {
    createDiscount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discount = yield discount_service_1.default.createDiscount(req.body);
                res.status(201).json(discount);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getDiscountById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discount = yield discount_service_1.default.getDiscountById(req.params.id);
                if (!discount) {
                    res.status(404).json({ message: "Discount not found" });
                }
                else {
                    res.status(200).json(discount);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllDiscounts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discounts = yield discount_service_1.default.getAllDiscounts();
                yield (0, middlewares_1.pagination)(req, res, discounts, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateDiscount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discount = yield discount_service_1.default.updateDiscount(req.params.id, req.body);
                if (!discount) {
                    res.status(404).json({ message: "Discount not found" });
                }
                else {
                    res.status(200).json(discount);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteDiscount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield discount_service_1.default.deleteDiscount(req.params.id);
                if (!result) {
                    res.status(404).json({ message: "Discount not found" });
                }
                else {
                    res.status(200).json({ message: "Discount deleted successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new DiscountController(); // Xuất một thể hiện duy nhất của lớp
//# sourceMappingURL=discount.controller.js.map