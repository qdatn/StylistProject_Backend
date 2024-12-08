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
const discount_model_1 = __importDefault(require("./discount.model"));
class DiscountRepository {
    create(discountData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_model_1.default.create(discountData);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_model_1.default.findById(id).populate("apply_items");
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_model_1.default.find().populate("apply_items");
        });
    }
    update(id, discountData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_model_1.default.findByIdAndUpdate(id, discountData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new DiscountRepository();
//# sourceMappingURL=discount.repository.js.map