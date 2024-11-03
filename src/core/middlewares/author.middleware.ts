import CustomRequest from "@core/interfaces/customRequest.interface";
import { Response, NextFunction } from "express";

const authorizeMiddleware = (requiredRoles: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const role = req.user.role;

    if (!requiredRoles.includes(role)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};

export default authorizeMiddleware;
