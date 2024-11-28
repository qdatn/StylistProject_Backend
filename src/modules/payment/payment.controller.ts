import axios from "axios";
import crypto from "crypto";
import { Request, Response } from "express";

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
      const redirectUrl = "http://localhost:3000/payment/success";
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
      const result = await axios(options);
      res.status(200).json(result.data);
    } catch (error: any) {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PaymentController();
