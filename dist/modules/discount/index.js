"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountDto = exports.DiscountRoute = exports.DiscountController = exports.DiscountService = exports.DiscountRepository = exports.Discount = void 0;
const discount_model_1 = __importDefault(require("./discount.model"));
exports.Discount = discount_model_1.default;
const discount_repository_1 = __importDefault(require("./discount.repository"));
exports.DiscountRepository = discount_repository_1.default;
const discount_service_1 = __importDefault(require("./discount.service"));
exports.DiscountService = discount_service_1.default;
const discount_controller_1 = __importDefault(require("./discount.controller"));
exports.DiscountController = discount_controller_1.default;
const discount_route_1 = __importDefault(require("./discount.route"));
exports.DiscountRoute = discount_route_1.default;
const discount_dto_1 = __importDefault(require("./dtos/discount.dto"));
exports.DiscountDto = discount_dto_1.default;
//# sourceMappingURL=index.js.map