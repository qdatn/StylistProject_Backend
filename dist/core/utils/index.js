"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.generateOTP = exports.uploadImage = exports.Logger = void 0;
const logger_1 = __importDefault(require("./logger"));
exports.Logger = logger_1.default;
const uploadImage_1 = __importDefault(require("./uploadImage"));
exports.uploadImage = uploadImage_1.default;
const generateOTP_1 = __importDefault(require("./generateOTP"));
exports.generateOTP = generateOTP_1.default;
const deleteImage_1 = __importDefault(require("./deleteImage"));
exports.deleteImage = deleteImage_1.default;
//# sourceMappingURL=index.js.map