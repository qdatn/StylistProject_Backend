"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSocket = registerUserSocket;
exports.removeUserSocket = removeUserSocket;
exports.getUserSocketId = getUserSocketId;
const userSocketMap = new Map();
function registerUserSocket(userId, socketId) {
    userSocketMap.set(userId, socketId);
}
function removeUserSocket(socketId) {
    for (const [userId, id] of userSocketMap.entries()) {
        if (id === socketId) {
            userSocketMap.delete(userId);
            break;
        }
    }
}
function getUserSocketId(userId) {
    return userSocketMap.get(userId);
}
//# sourceMappingURL=socketMap.js.map