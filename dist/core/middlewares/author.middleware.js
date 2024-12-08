"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizeMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        const role = req.user.role;
        if (!requiredRoles.includes(role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};
exports.default = authorizeMiddleware;
//# sourceMappingURL=author.middleware.js.map