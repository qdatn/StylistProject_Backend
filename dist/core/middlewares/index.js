"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.increaseProductStock = exports.reduceProductStock = exports.authorizeMiddleware = exports.errorMiddleWare = exports.authMiddleware = void 0;
const auth_middleware_1 = __importDefault(require("./auth.middleware"));
exports.authMiddleware = auth_middleware_1.default;
const error_middleware_1 = __importDefault(require("./error.middleware"));
exports.errorMiddleWare = error_middleware_1.default;
const author_middleware_1 = __importDefault(require("./author.middleware"));
exports.authorizeMiddleware = author_middleware_1.default;
const reduceProductQty_middleware_1 = __importDefault(require("./reduceProductQty.middleware"));
exports.reduceProductStock = reduceProductQty_middleware_1.default;
const increaseProductQty_middleware_1 = __importDefault(require("./increaseProductQty.middleware"));
exports.increaseProductStock = increaseProductQty_middleware_1.default;
const pagination_middleware_1 = __importDefault(require("./pagination.middleware"));
exports.pagination = pagination_middleware_1.default;
//# sourceMappingURL=index.js.map