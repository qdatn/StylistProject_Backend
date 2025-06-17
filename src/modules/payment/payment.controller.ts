import axios from "axios";
import crypto from "crypto";
import { Request, Response } from "express";
import qs from "qs";
// import moment from "moment";
import moment from "moment-timezone";

const frontendUrl = process.env.BASE_URL;

const vnp_TmnCode = process.env.VNPAY_VNP_TMN_CODE || "";
const vnp_HashSecret = process.env.VNPAY_VNP_HASH_SECRET || "";
const vnp_Url = process.env.VNPAY_VNP_API_URL!;
const vnp_ReturnUrl = `${frontendUrl}/payment/success`;

// Hàm sắp xếp object theo key (alpha tăng dần)
function sortObject(obj: Record<string, any>) {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}

class PaymentController {
  async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const {
        order_id,
        amount,
        orderInfo,
        requestType,
        extraData,
        autoCapture,
      }: any = req.body;

      // Các tham số cố định
      const accessKey = "F8BBA842ECF85";
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      const partnerCode = "MOMO";
      const redirectUrl =
        // `http://localhost:3000/payment/success`;
        `${frontendUrl}/payment/success`;
      const ipnUrl =
        "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
      const orderId = order_id + new Date().getTime();
      const requestId = orderId;
      const lang = "vi";
      const orderGroupId = "";

      // Tạo chữ ký (HMAC SHA256)
      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
      const signature = crypto
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
      const result = await axios.request(options);
      res.status(200).json(result.data);
    } catch (error: any) {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async createVnpayPayment(req: Request, res: Response): Promise<void> {
    try {
      const buildSignData = (params: Record<string, any>): string => {
        return Object.entries(params)
          .filter(
            ([_, value]) =>
              value !== null && value !== undefined && value !== ""
          )
          .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
          .map(([key, value]) => `${key}=${value}`)
          .join("&");
      };

      const buildUrlQuery = (params: Record<string, any>): string => {
        return Object.entries(params)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
      };

      const { order_id, amount, bankCode } = req.body;

      // Debug input values
      console.log("Input values:", { order_id, amount, bankCode });

      const date = new Date();
      const createDate = moment(date)
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYYMMDDHHmmss");

      const expireDate = moment(date)
        .add(15, "minutes")
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYYMMDDHHmmss");

      // Get IP address and handle IPv6 loopback
      let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.socket?.remoteAddress ||
        "127.0.0.1";
      if (Array.isArray(ipAddr)) {
        ipAddr = ipAddr[0];
      }
      ipAddr = ipAddr.toString().split(",")[0].trim();
      // Convert IPv6 loopback to IPv4 loopback
      ipAddr = ipAddr === "::1" ? "127.0.0.1" : ipAddr;

      const orderId = order_id + moment(date).format("DDHHmmss");

      // Ensure amount is a number and multiply by 100
      const vnpAmount = Math.round(Number(amount) * 100);

      let vnp_Params: Record<any, any> = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: vnp_TmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: "Payment for order " + orderId,
        vnp_OrderType: "200000",
        vnp_Amount: vnpAmount,
        vnp_ReturnUrl: vnp_ReturnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate,
      };

      if (bankCode && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      // Remove empty params
      Object.keys(vnp_Params).forEach((key) => {
        if (vnp_Params[key] === undefined || vnp_Params[key] === "") {
          delete vnp_Params[key];
        }
      });

      // Debug environment variables
      console.log("Debug values:", {
        vnp_TmnCode,
        vnp_HashSecret,
        vnp_Url,
        vnp_ReturnUrl,
      });

      // Debug params before sorting
      console.log("Params before sorting:", vnp_Params);

      // Create signData: sort keys, join string, NO encode
      const signData = Object.keys(vnp_Params)
        .sort()
        .map((key) => `${key}=${vnp_Params[key]}`)
        .join("&");

      // Debug sign data
      console.log("Debug signData:", signData);
      console.log("Debug signData length:", signData.length);
      console.log("Debug HashSecret length:", vnp_HashSecret.length);

      // Create secureHash
      const secureHash = crypto
        .createHmac("sha512", vnp_HashSecret)
        .update(signData, "utf-8")
        .digest("hex");

      // Debug secure hash
      console.log("Secure hash:", secureHash);

      // Add secureHash to params
      vnp_Params["vnp_SecureHash"] = secureHash;

      // Create final URL (lúc này mới encode)
      const payUrl =
        vnp_Url +
        "?" +
        Object.entries(vnp_Params)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&");

      // Debug final URL
      console.log("Payment URL:", payUrl);
      console.log("URL query string:", buildUrlQuery(vnp_Params));
      console.log("Final params with signature:", vnp_Params);

      console.log("Debug params:", {
        amount: amount * 100,
        orderId,
        createDate,
        expireDate,
        ipAddr,
      });

      res.status(200).json({ payUrl: payUrl });
    } catch (error: any) {
      console.error("VNPay error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PaymentController();
