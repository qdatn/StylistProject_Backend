import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import IAuth from "@modules/auth/auth.interface";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.header("Authorization")?.split(" ")[1];
  const TWT_SECRET = process.env.JWT_SECRET || "";
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }
  try {
    const jwtVerified = jwt.verify(token, TWT_SECRET) as IAuth;

    if (jwtVerified) {
      (req as Request & { user?: IAuth }).user = jwtVerified;
      next();
    } else {
      throw new Error("Error in token");
    }
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
