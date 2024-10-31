import { Request, Response, NextFunction } from "express";
import IAuth from "@modules/auth/auth.interface";

interface CustomRequest extends Request {
  user: IAuth; // thêm user vào Request, có thể là undefined
}

const authorizeMiddleware = (requiredRoles: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const role = req.user.role; // giả sử đã giải mã JWT và gán thông tin vào `req.user`

    if (!requiredRoles.includes(role)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};

export default authorizeMiddleware;
