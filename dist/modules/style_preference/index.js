"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylePreferenceRoute = exports.StylePreferenceRepository = exports.StylePreferenceService = exports.StylePreferenceController = exports.StylePreference = void 0;
const style_model_1 = __importDefault(require("./style.model"));
exports.StylePreference = style_model_1.default;
const style_controller_1 = __importDefault(require("./style.controller"));
exports.StylePreferenceController = style_controller_1.default;
const style_service_1 = __importDefault(require("./style.service"));
exports.StylePreferenceService = style_service_1.default;
const style_repositoty_1 = __importDefault(require("./style.repositoty"));
exports.StylePreferenceRepository = style_repositoty_1.default;
const style_route_1 = __importDefault(require("./style.route"));
exports.StylePreferenceRoute = style_route_1.default;
//# sourceMappingURL=index.js.map