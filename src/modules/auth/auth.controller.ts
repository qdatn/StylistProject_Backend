// controllers/authController.js
import AuthService from "@modules/auth/auth.service";
import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/register.dto";
// import AuthDto from "./dtos/auth.dto";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user: RegisterDto = req.body;
      await AuthService.register(user);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.json({ user, token });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await AuthService.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await AuthService.deleteUser(req.params.id);
      if (!result) {
        res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new AuthController();
