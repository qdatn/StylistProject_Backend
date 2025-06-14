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
const style_service_1 = __importDefault(require("./style.service"));
class StylePreferenceController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield style_service_1.default.create(req.body);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getAll(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield style_service_1.default.getAll();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield style_service_1.default.getById(req.params.id);
                if (!result) {
                    res.status(404).json({ message: "Style preference not found" });
                }
                else {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield style_service_1.default.update(req.params.id, req.body);
                if (!result) {
                    res.status(404).json({ message: "Style preference not found" });
                }
                else {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield style_service_1.default.delete(req.params.id);
                if (!result) {
                    res.status(404).json({ message: "Style preference not found" });
                }
                else {
                    res.status(200).json({ message: "Deleted successfully" });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getAnalytics(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const analyticsData = yield style_service_1.default.getAnalytics();
                res.status(200).json({ data: analyticsData });
            }
            catch (error) {
                console.error("Analytics error:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.default = new StylePreferenceController();
//# sourceMappingURL=style.controller.js.map