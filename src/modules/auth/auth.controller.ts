// controllers/authController.js
import AuthService from "@modules/auth/auth.service";
import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/register.dto";
import OTP from "./otp.model";
import IAuth from "./auth.interface";
// import AuthDto from "./dtos/auth.dto";
import jwt from "jsonwebtoken";
import generateJwt from "@core/utils/generateJwt";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user: RegisterDto = req.body;
      // await AuthService.sendVerificationEmail(user.email);
      // const result = await AuthService.verifyOTP(user.email, user.otp);
      // if (result.success) {
      await AuthService.register(user);
      res.status(201).json(user);
      // } else {
      //   res.status(400).json({ message: result.message });
      // }
    } catch (error: any) {
      next(error);
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
    } catch (error: any) {
      next(error);
    }
  }

  async checkEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      const user = await AuthService.checkEmail(email);
      if (user) {
        res.status(200).json({ exists: true, message: "Email already exists" });
      } else {
        res
          .status(200)
          .json({ exists: false, message: "Email haven't been registered" });
      }
    } catch (error: any) {
      next(error);
    }
  }

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res
          .status(400)
          .json({ message: "Email and new password are required" });
        return;
      }

      await AuthService.updatePasswordByEmail(email, password);

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Xóa cookie chứa token
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logged out successfully" });
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
      } else {
        res.json(user);
      }
    } catch (error: any) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Check if the logged-in user is deleting their own account
      if ((req as Request & { user?: IAuth }).user?._id !== req.params.id) {
        res
          .status(403)
          .json({ message: "You can only delete your own account" });
      }
      const result = await AuthService.deleteUser(req.params.id);
      if (!result) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
      }
    } catch (error: any) {
      next(error);
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
    } catch (error: any) {
      next(error);
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
    } catch (error: any) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.token;

    if (!refreshToken) {
      return next("Refresh token is required");
    }

    try {
      // Giải mã refresh token để kiểm tra tính hợp lệ
      const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET!);

      // Lấy thông tin người dùng từ decoded (hoặc từ DB nếu cần)
      const user = await AuthService.findUserbyEmail(decoded.email);

      if (!user) {
        return next("User not found");
      }

      // Tạo lại access token và refresh token mới
      const newRefreshToken = generateJwt(user);

      // Cập nhật refresh token vào cookie mới
      res.cookie("token", newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 2 * 1000, // refresh token sống 2 ngày
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new AuthController();
