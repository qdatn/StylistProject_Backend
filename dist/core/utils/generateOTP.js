"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateOTP;
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // 6 chữ số ngẫu nhiên
}
//# sourceMappingURL=generateOTP.js.map