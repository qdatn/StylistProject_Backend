"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // const token = req.header("Authorization")?.split(" ")[1];
    const TWT_SECRET = process.env.JWT_SECRET || "";
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
    }
    try {
        const jwtVerified = jsonwebtoken_1.default.verify(token, TWT_SECRET);
        if (jwtVerified) {
            req.user = jwtVerified;
            next();
        }
        else {
            throw new Error("Error in token");
        }
    }
    catch (err) {
        next(err);
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map