import axios from "axios";
import crypto from "crypto";
import { Request, Response } from "express";
import qs from "qs";
import moment from "moment";

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
      const buildQueryString = (
        params: Record<string, any>
        // encode = true
      ): string => {
        const searchParams = new URLSearchParams();

        Object.entries(params)
          .sort(([key1], [key2]) => key1.localeCompare(key2)) // sort by key
          .forEach(([key, value]) => {
            if (
              value !== null &&
              value !== undefined &&
              value !== "" &&
              typeof value !== "object"
            ) {
              searchParams.append(key, value.toString());
            }
          });

        return searchParams.toString();
      };
      // const { order_id, amount, orderInfo, requestType } = req.query;
      const { order_id, amount, bankCode } = req.body;

      const date = new Date();
      const createDate = moment(date).format("YYYYMMDDHHmmss");

      const expireDate = moment(date)
        .add(15, "minutes")
        .format("YYYYMMDDHHmmss"); // 15 phút sau
      // const vnp_ExpireDate = expireDate
      //   .toLocaleString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" })
      //   .replace(/[-T:\s]/g, "")
      //   .slice(0, 14);

      const ipAddr = (
        (Array.isArray(req.headers["x-forwarded-for"])
          ? req.headers["x-forwarded-for"][0]
          : req.headers["x-forwarded-for"]) ||
        req.socket?.remoteAddress ||
        "127.0.0.1"
      )
        ?.toString()
        .split(",")[0]
        .trim();

      const orderId = order_id + moment(date).format("DDHHmmss");

      let vnp_Params: Record<any, any> = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: vnp_TmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: "Payment for order:" + orderId,
        vnp_OrderType: "200000",
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: vnp_ReturnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate,
        // vnp_SecureHashType: "SHA512",
      };

      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      // Remove empty params
      // Object.keys(vnp_Params).forEach((key) => {
      //   if (vnp_Params[key] === undefined || vnp_Params[key] === "")
      //     delete vnp_Params[key];
      // });

      vnp_Params = sortObject(vnp_Params);
      // Sort and sign with URL encoding
      // vnp_Params = Object.fromEntries(
      //   Object.entries(vnp_Params).sort(([a], [b]) => a.localeCompare(b))
      // );
      // const signData = qs.stringify(vnp_Params, { encode: false }); // Encode values here
      const signData = buildQueryString(vnp_Params);

      const hmac = crypto.createHmac("sha256", vnp_HashSecret);
      const secureHash = hmac
        .update(Buffer.from(signData, "utf-8"))
        .digest("hex");

      vnp_Params["vnp_SecureHash"] = secureHash;

      const paymentUrl = `${vnp_Url}?${buildQueryString(vnp_Params)}`;
      console.log("signdata", signData);
      console.log(vnp_TmnCode + "\n" + vnp_HashSecret + "\n" + vnp_Url);
      res.status(200).json({ payUrl: paymentUrl });
    } catch (error: any) {
      console.error("VNPay error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PaymentController();
