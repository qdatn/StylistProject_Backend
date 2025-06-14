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
const attribute_repository_1 = __importDefault(require("./attribute.repository"));
class AttributeService {
    createAttribute(attributeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_repository_1.default.create(attributeData);
        });
    }
    getAttributesByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_repository_1.default.findOne(key);
        });
    }
    getAllAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_repository_1.default.findAll();
        });
    }
    updateAttribute(key, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_repository_1.default.update(key, updateData);
        });
    }
    deleteAttribute(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attribute_repository_1.default.delete(key);
        });
    }
    addNewValue(key, newValues) {
        return __awaiter(this, void 0, void 0, function* () {
            // const attribute: AttributeDTO = (await AttributeRepository.findOne(
            //   key
            // )) as AttributeDTO;
            // const values = attribute.value ?? [];
            // newValues.forEach((value) => {
            //   if (!values.includes(value)) {
            //     values.push(value);
            //   }
            // });
            return yield attribute_repository_1.default.addValue(key, newValues);
        });
    }
    deleteValue(key, values) {
        return __awaiter(this, void 0, void 0, function* () {
            // const attribute: AttributeDTO = (await AttributeRepository.findOne(
            //   key
            // )) as AttributeDTO;
            // const values = attribute.value ?? [];
            // newValues.forEach((value) => {
            //   if (!values.includes(value)) {
            //     values.push(value);
            //   }
            // });
            return yield attribute_repository_1.default.deleteValue(key, values);
        });
    }
}
exports.default = new AttributeService();
//# sourceMappingURL=attribute.service.js.map