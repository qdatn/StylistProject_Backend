"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = exports.ChatRoute = exports.ChatService = exports.ChatController = void 0;
const chat_controller_1 = __importDefault(require("./chat.controller"));
exports.ChatController = chat_controller_1.default;
const chat_service_1 = __importDefault(require("./chat.service"));
exports.ChatService = chat_service_1.default;
const chat_route_1 = __importDefault(require("./chat.route"));
exports.ChatRoute = chat_route_1.default;
const chat_model_1 = __importDefault(require("./chat.model"));
exports.ChatModel = chat_model_1.default;
//# sourceMappingURL=index.js.map