"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRoute = exports.AddressDTO = exports.AddressService = exports.AddressController = exports.AddressRepository = exports.Address = void 0;
const address_model_1 = __importDefault(require("./address.model"));
exports.Address = address_model_1.default;
const address_repository_1 = __importDefault(require("./address.repository"));
exports.AddressRepository = address_repository_1.default;
const address_controller_1 = __importDefault(require("./address.controller"));
exports.AddressController = address_controller_1.default;
const address_service_1 = __importDefault(require("./address.service"));
exports.AddressService = address_service_1.default;
const address_dto_1 = __importDefault(require("./dtos/address.dto"));
exports.AddressDTO = address_dto_1.default;
const address_route_1 = __importDefault(require("./address.route"));
exports.AddressRoute = address_route_1.default;
//# sourceMappingURL=index.js.map