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
exports.default = handleChatSocket;
const chat_service_1 = __importDefault(require("./chat.service"));
const socketMap_1 = require("../../core/utils/socketMap");
function handleChatSocket(io, socket) {
    socket.on("sendMessage", (data) => __awaiter(this, void 0, void 0, function* () {
        const { sender, receiver, content } = data;
        const message = yield chat_service_1.default.saveMessage(sender, receiver, content);
        // Gửi tới người nhận nếu online
        const receiverSocketId = (0, socketMap_1.getUserSocketId)(receiver);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", message);
        }
        // Xác nhận cho người gửi
        socket.emit("messageSent", message);
    }));
}
//# sourceMappingURL=chat.socket.js.map