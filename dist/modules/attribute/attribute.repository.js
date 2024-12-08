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
const attribute_model_1 = __importDefault(require("./attribute.model"));
class AttributeRepository {
    create(attributeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_model_1.default.create(attributeData);
        });
    }
    findOne(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_model_1.default.findOne({ key: key });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_model_1.default.find();
        });
    }
    update(key, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_model_1.default.findOneAndUpdate({ key: key }, updateData, {
                new: true,
            });
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_model_1.default.deleteOne({ key: key });
        });
    }
    addValue(key, newValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_model_1.default.findOneAndUpdate({ key: key }, { $addToSet: { value: { $each: newValues } } }, {
                new: true,
            });
        });
    }
    deleteValue(key, newValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_model_1.default.findOneAndUpdate({ key: key }, { $pull: { value: { $in: newValues } } }, {
                new: true,
            });
        });
    }
}
exports.default = new AttributeRepository();
//# sourceMappingURL=attribute.repository.js.map