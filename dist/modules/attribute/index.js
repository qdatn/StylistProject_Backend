"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeDto = exports.AttributeRoute = exports.AttributeController = exports.AttributeService = exports.AttributeRepository = exports.Attribute = void 0;
const attribute_model_1 = __importDefault(require("./attribute.model"));
exports.Attribute = attribute_model_1.default;
const attribute_repository_1 = __importDefault(require("./attribute.repository"));
exports.AttributeRepository = attribute_repository_1.default;
const attribute_service_1 = __importDefault(require("./attribute.service"));
exports.AttributeService = attribute_service_1.default;
const attribute_controller_1 = __importDefault(require("./attribute.controller"));
exports.AttributeController = attribute_controller_1.default;
const attribute_route_1 = __importDefault(require("./attribute.route"));
exports.AttributeRoute = attribute_route_1.default;
// import IAttribute from "./attribute.interface";
const attribute_dto_1 = __importDefault(require("./dtos/attribute.dto"));
exports.AttributeDto = attribute_dto_1.default;
//# sourceMappingURL=index.js.map