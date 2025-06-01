"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJwt(user, expiredTime) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const options = { expiresIn: expiredTime || "3h" }; // Default to 3 hour if no expiredTime is provided
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
}
//# sourceMappingURL=generateJwt.js.map