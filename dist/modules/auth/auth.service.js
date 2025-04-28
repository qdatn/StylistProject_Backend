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
// services/authService.js
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = __importDefault(require("./auth.repository"));
const userInfo_repository_1 = __importDefault(require("../userInfo/userInfo.repository"));
const cart_1 = require("../cart");
const utils_1 = require("../../core/utils");
const generateJwt_1 = __importDefault(require("../../core/utils/generateJwt"));
const auth_1 = require("../auth");
const resend_1 = require("resend");
class AuthService {
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = userData;
            const existingUser = yield auth_repository_1.default.findByEmail(email);
            if (existingUser)
                throw new Error("Email already in use");
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield auth_repository_1.default.createUser({
                email,
                password: hashedPassword,
                role,
            });
            // Tạo UserInfo cho User mới với user_id là _id của User
            const userinfo = yield userInfo_repository_1.default.create({
                user: user._id,
                name: name || "No Name Provided", // Tên có thể lấy từ userData hoặc mặc định
            });
            // Tạo UserInfo cho User mới với user_id là _id của User
            const cart = yield cart_1.CartRepository.createCart({
                user: user._id,
                products: [],
            });
            // return userRepository.createUser({ email, password: hashedPassword, role });
            return { user, userinfo, cart };
            // return { user, userinfo };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_repository_1.default.findByEmail(email);
            if (!user)
                throw new Error("Invalid email or password");
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid)
                throw new Error("Invalid email or password");
            const token = (0, generateJwt_1.default)(user);
            return { user, token };
        });
    }
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Kiểm tra nếu `updateData` có chứa `password` thì hash nó trước khi lưu
            if (updateData.password) {
                updateData.password = yield bcrypt_1.default.hash(updateData.password, 10);
            }
            return yield auth_repository_1.default.updateUser(id, updateData);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_repository_1.default.deleteUser(id);
        });
    }
    sendVerificationEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
            const otp = (0, utils_1.generateOTP)();
            const verificationUrl = `
    Hello,

    Thank you for registering an account at [ Stylist ]. To complete your registration, please click the link below to verify your email address.

    Verification link: ${process.env.BASE_URL}/auth/verify?otp=${otp}

    OTP code: ${otp}

    Note: This link/OTP will expire in 5 minutes.

    If you did not request this registration, please ignore this email.

    Best regards,
    The [ Stylist ] Support Team
    `;
            // Lưu OTP và thời gian hết hạn vào cơ sở dữ liệu
            yield auth_1.OTP.create({
                email,
                otp,
                expiresAt: Date.now() + 5 * 60 * 1000, // 5 phút
            });
            // Gửi email chứa đường dẫn xác minh
            // const transporter = nodemailer.createTransport({
            //   host: process.env.SMTP_HOST,
            //   port: 587,
            //   secure: false,
            //   auth: {
            //     user: process.env.SMTP_USER, // SendGrid SMTP uses 'apikey' as the username
            //     pass: process.env.SMTP_PASS, // Replace with your SendGrid API key
            //   },
            // });
            // await transporter.sendMail({
            //   // from: process.env.SMTP_USER,
            //   from: process.env.RESEND_EMAIL,
            //   to: email,
            //   subject: "Email Verification for [ Stylist ] registrations",
            //   text: `${verificationUrl}`,
            // });
            resend.emails.send({
                from: "onboarding@resend.dev",
                to: "datnq2003@gmail.com",
                subject: "Email Verification for [ Stylist ] registrations",
                text: `${verificationUrl}`,
            });
        });
    }
    verifyOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            // Kiểm tra OTP và userId trong cơ sở dữ liệu
            const otpRecord = yield auth_1.OTP.findOne({
                otp: otp,
                isUsed: false,
            });
            if (!otpRecord) {
                return {
                    success: false,
                    message: "Invalid OTP or OTP has already been used.",
                };
            }
            else {
                // Kiểm tra thời gian hết hạn của OTP
                if (otpRecord && otpRecord.expiresAt.getTime() < Date.now()) {
                    yield auth_1.OTP.deleteOne({ email: email, otp: otp });
                    return { success: false, message: "OTP has expired." };
                }
                else {
                    // Đánh dấu OTP là đã sử dụng và xác minh thành công
                    yield auth_1.OTP.updateOne({ email: email, otp: otp }, { isUsed: true });
                    return { success: true, message: "OTP verified successfully." };
                }
            }
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield auth_repository_1.default.findByEmail(email);
            return !!existingUser;
        });
    }
    updatePasswordByEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_repository_1.default.findByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            // Hash mật khẩu mới
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Cập nhật mật khẩu
            const updatedUser = yield auth_repository_1.default.updateUserByEmail(email, hashedPassword);
            return !!updatedUser; // Trả về true nếu cập nhật thành công
        });
    }
    findUserbyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_repository_1.default.findByEmail(email);
            // if (!user) {
            //   return "User not found";
            // }
            return user;
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map