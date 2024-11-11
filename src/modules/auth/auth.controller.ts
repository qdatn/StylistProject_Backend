// controllers/authController.js
import AuthService from "@modules/auth/auth.service";
import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/register.dto";
import OTP from "./otp.model";
// import AuthDto from "./dtos/auth.dto";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user: RegisterDto = req.body;
      // await AuthService.sendVerificationEmail(user.email);
      const result = await AuthService.verifyOTP(user.email, user.otp);
      if (result.success) {
        await AuthService.register(user);
        res.status(201).json(user);
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 1000,
        // signed: true,
      });
      res.json({ user, token });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Xóa cookie chứa token
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
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

  async sendVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.query;

      if (!email) {
        res.status(400).json({ message: "Email are required." });
      } else {
        const result = await AuthService.sendVerificationEmail(
          email.toString()
        );
        res
          .status(200)
          .json({ message: "Verification email sent successfully" });
      }
    } catch (err: any) {
      if (!res.headersSent) {
        res.status(500).json({ message: err });
      }
    }
  }

  async verifyOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, otp } = req.body;
      // Kiểm tra OTP và userId trong cơ sở dữ liệu
      const otpRecord = await OTP.findOne({
        otp: otp,
        isUsed: false,
      });

      if (!otpRecord) {
        res
          .status(400)
          .json({ message: "Invalid or expired OTP or OTP is used!" });
      } else {
        // Kiểm tra thời gian hết hạn của OTP
        if (otpRecord && otpRecord.expiresAt.getTime() < Date.now()) {
          await OTP.deleteOne({ email: email, otp: otp });
          res.status(400).json({ message: "OTP expired" });
        } else {
          // Đánh dấu OTP là đã sử dụng và xác minh thành công
          await OTP.updateOne({ email: email, otp: otp }, { isUsed: true });
          res.status(200).json({ message: "OTP verified successfully" });
        }
      }
    } catch (err: any) {
      if (!res.headersSent) {
        res.status(500).json({ message: err });
      }
    }
  }
}

export default new AuthController();
