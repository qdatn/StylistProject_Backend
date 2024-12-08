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
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
class PaymentController {
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { order_id, amount, orderInfo, requestType, extraData, autoCapture, } = req.body;
                // Các tham số cố định
                const accessKey = "F8BBA842ECF85";
                const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
                const partnerCode = "MOMO";
                const redirectUrl = "http://localhost:3000/payment/success";
                const ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
                const orderId = order_id + new Date().getTime();
                const requestId = orderId;
                const lang = "vi";
                const orderGroupId = "";
                // Tạo chữ ký (HMAC SHA256)
                const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
                const signature = crypto_1.default
                    .createHmac("sha256", secretKey)
                    .update(rawSignature)
                    .digest("hex");
                // JSON object gửi đến MoMo
                const requestBody = JSON.stringify({
                    partnerCode,
                    partnerName: "Test",
                    storeId: "MomoTestStore",
                    requestId,
                    amount,
                    orderId,
                    orderInfo,
                    redirectUrl,
                    ipnUrl,
                    lang,
                    requestType,
                    autoCapture,
                    extraData,
                    orderGroupId,
                    signature,
                });
                // Cấu hình HTTPS request
                const options = {
                    method: "POST",
                    url: "https://test-payment.momo.vn/v2/gateway/api/create",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": Buffer.byteLength(requestBody),
                    },
                    data: requestBody,
                };
                // Gửi request tới MoMo
                const result = yield (0, axios_1.default)(options);
                res.status(200).json(result.data);
            }
            catch (error) {
                console.error("Error:", error.message);
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new PaymentController();
//# sourceMappingURL=payment.controller.js.map