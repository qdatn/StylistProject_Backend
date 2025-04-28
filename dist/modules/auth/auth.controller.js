"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// controllers/authController.js
const auth_service_1 = __importDefault(require("../auth/auth.service"));
const otp_model_1 = __importDefault(require("./otp.model"));
// import AuthDto from "./dtos/auth.dto";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwt_1 = __importDefault(require("../../core/utils/generateJwt"));
const axios_1 = __importDefault(require("axios"));
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                // await AuthService.sendVerificationEmail(user.email);
                // const result = await AuthService.verifyOTP(user.email, user.otp);
                // if (result.success) {
                yield auth_service_1.default.register(user);
                res.status(201).json(user);
                // } else {
                //   res.status(400).json({ message: result.message });
                // }
            }
            catch (error) {
                next(error);
            }
        });
    }
    googleLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
                // Xác thực token từ Google
                const response = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
                const googleUser = response.data;
                // Kiểm tra người dùng đã tồn tại trong DB chưa
                let user = yield user_model_1.default.findOne({ email: googleUser.email });
                if (!user) {
                    // Nếu người dùng chưa tồn tại, tạo mới thông qua register
                    // Tạo đối tượng user để gửi vào đăng ký
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hashedPassword = yield bcrypt_1.default.hash("1234", salt); // Mã hóa mật khẩu mặc định '1234'
                    const registerDto = {
                        name: googleUser.name,
                        email: googleUser.email,
                        password: "1234", // Mật khẩu tạm thời
                        role: "customer", // Hoặc xác định vai trò tùy theo yêu cầu
                    };
                    // Gọi hàm register từ AuthService để đăng ký người dùng
                    yield auth_service_1.default.register(registerDto);
                    // Sau khi đăng ký, tìm lại người dùng trong DB
                    user = yield user_model_1.default.findOne({ email: googleUser.email });
                }
                // Tạo JWT token cho người dùng
                if (user) {
                    const tokenJWT = (0, generateJwt_1.default)(user);
                    // Lưu token vào cookie
                    res.cookie("token", tokenJWT, {
                        httpOnly: true, // Không thể truy cập cookie từ JavaScript
                        secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong môi trường production
                        maxAge: 60 * 60 * 24 * 1000, // Cookie tồn tại 1 ngày
                    });
                    // Trả về user và token
                    res.status(200).json({
                        message: "Login success",
                        token: tokenJWT,
                        user,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { user, token } = yield auth_service_1.default.login(email, password);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 24 * 1000,
                    // signed: true,
                });
                res.json({ user, token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    checkEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield auth_service_1.default.checkEmail(email);
                if (user) {
                    res.status(200).json({ exists: true, message: "Email already exists" });
                }
                else {
                    res
                        .status(200)
                        .json({ exists: false, message: "Email haven't been registered" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res
                        .status(400)
                        .json({ message: "Email and new password are required" });
                    return;
                }
                yield auth_service_1.default.updatePasswordByEmail(email, password);
                res.status(200).json({ message: "Password updated successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Xóa cookie chứa token
            res
                .clearCookie("token")
                .status(200)
                .json({ message: "Logged out successfully" });
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_service_1.default.updateUser(req.params.id, req.body);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                }
                else {
                    res.json(user);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Check if the logged-in user is deleting their own account
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) !== req.params.id) {
                    res
                        .status(403)
                        .json({ message: "You can only delete your own account" });
                }
                const result = yield auth_service_1.default.deleteUser(req.params.id);
                if (!result) {
                    res.status(404).json({ message: "User not found" });
                }
                else {
                    res.status(200).json({ message: "User deleted successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendVerification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                if (!email) {
                    res.status(400).json({ message: "Email are required." });
                }
                else {
                    const result = yield auth_service_1.default.sendVerificationEmail(email.toString());
                    res
                        .status(200)
                        .json({ message: "Verification email sent successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                // Kiểm tra OTP và userId trong cơ sở dữ liệu
                const otpRecord = yield otp_model_1.default.findOne({
                    otp: otp,
                    isUsed: false,
                });
                if (!otpRecord) {
                    res
                        .status(400)
                        .json({ message: "Invalid or expired OTP or OTP is used!" });
                }
                else {
                    // Kiểm tra thời gian hết hạn của OTP
                    if (otpRecord && otpRecord.expiresAt.getTime() < Date.now()) {
                        yield otp_model_1.default.deleteOne({ email: email, otp: otp });
                        res.status(400).json({ message: "OTP expired" });
                    }
                    else {
                        // Đánh dấu OTP là đã sử dụng và xác minh thành công
                        yield otp_model_1.default.updateOne({ email: email, otp: otp }, { isUsed: true });
                        res.status(200).json({ message: "OTP verified successfully" });
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.token;
            if (!refreshToken) {
                return next("Refresh token is required");
            }
            try {
                // Giải mã refresh token để kiểm tra tính hợp lệ
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
                // Lấy thông tin người dùng từ decoded (hoặc từ DB nếu cần)
                const user = yield auth_service_1.default.findUserbyEmail(decoded.email);
                if (!user) {
                    return next("User not found");
                }
                // Tạo lại access token và refresh token mới
                const newRefreshToken = (0, generateJwt_1.default)(user);
                // Cập nhật refresh token vào cookie mới
                res.cookie("token", newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 24 * 2 * 1000, // refresh token sống 2 ngày
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    setPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, password } = req.body;
                // Mã hóa mật khẩu trước khi lưu vào DB
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Cập nhật mật khẩu cho người dùng
                const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
                if (!updatedUser) {
                    throw new Error("User not found");
                }
                // Trả về thông tin người dùng và thông báo thành công
                res.status(200).json({
                    message: "Password updated successfully",
                    user: updatedUser,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map