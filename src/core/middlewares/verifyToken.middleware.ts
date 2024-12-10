// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// import CustomRequest from "@core/interfaces/customRequest.interface";

// const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Access token required" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired access token" });
//   }
// };

// export default verifyAccessToken;
