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
const attribute_service_1 = __importDefault(require("../attribute/attribute.service"));
class AttributeController {
    createAttribute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attribute = yield attribute_service_1.default.createAttribute(req.body);
                res.status(201).json(attribute);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAttributeByKey(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attribute = yield attribute_service_1.default.getAttributesByKey(req.params.key);
                if (!attribute) {
                    res.status(404).json({ message: "Attribute not found" });
                }
                else {
                    res.status(200).json(attribute);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllAttributes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attributes = yield attribute_service_1.default.getAllAttributes();
                yield (0, middlewares_1.pagination)(req, res, attributes, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateAttribute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedAttribute = yield attribute_service_1.default.updateAttribute(req.params.key, req.body);
                if (!updatedAttribute) {
                    res.status(404).json({ message: "Attribute not found" });
                }
                else {
                    res.json(updatedAttribute);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteAttribute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedAttribute = yield attribute_service_1.default.deleteAttribute(req.params.key);
                if (!deletedAttribute) {
                    res.status(404).json({ message: "Attribute not found" });
                }
                else {
                    res.status(200).json({ message: "Attribute deleted successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    addValue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attribute = yield attribute_service_1.default.addNewValue(req.params.key, req.body.values);
                if (!attribute) {
                    res.status(404).json({ message: "Attribute not found" });
                }
                else {
                    res
                        .status(200)
                        .json({ attribute, message: "Value added successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteValue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attribute = yield attribute_service_1.default.deleteValue(req.params.key, req.body.values);
                if (!attribute) {
                    res.status(404).json({ message: "Attribute not found" });
                }
                else {
                    res
                        .status(200)
                        .json({ attribute, message: "Value added successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AttributeController();
//# sourceMappingURL=attribute.controller.js.map