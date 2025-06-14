"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const errorMiddleWare = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    logger_1.default.error(`[Error] - Status: ${status}, Message: ${message}`);
    res.status(status).json({
        message: message,
    });
};
exports.default = errorMiddleWare;
//# sourceMappingURL=error.middleware.js.map