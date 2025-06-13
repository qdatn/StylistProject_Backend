import { Request, Response, NextFunction } from "express";
import ChatService from "./chat.service";
import { UserService } from "@modules/auth";
import userInfoService from "@modules/userInfo/userInfo.service";
import productService from "@modules/product/product.service";
import { askGeminiAboutRecommendation } from "./gemini.service";

const BASE_URL = process.env.BASE_URL;

interface RecommendedProduct {
  name: string;
  description: string;
  productId: string;
  link: string;
  image?: string;
}

class ChatController {
  async getMessages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { user1Id, user2Id } = req.query;

    try {
      const messages = await ChatService.getMessagesBetweenUsers(
        user1Id as string,
        user2Id as string
      );

      // 👉 Tắt cache để luôn trả dữ liệu mới
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages." });
    }
  }


  /*------------- CHAT BOT HERE --------------- */

  async getProductAnswer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { productId, userId, question } = req.body;

      // if (!productId || !question) {
      //   res.status(400).json({ message: "Missing productId or question" });
      //   return;
      // }

      const answer = await ChatService.generateProductAnswer(
        productId,
        userId,
        question
      );
      res.status(200).json({ answer });
    } catch (err: any) {
      console.error(err);
      if (res.headersSent) return;
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  }


  // Recommend products based on user bodyshape
  async getRecommendedProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.userId;

      // Lấy thông tin người dùng
      const userInfo = await userInfoService.getUserInfoById(userId);
      if (!userInfo) {
        next({ message: "User not found" });
      }

      // Lấy danh sách sản phẩm
      const products = await productService.getAllProductActive();

      // Gọi Gemini để nhận gợi ý
      const content = await askGeminiAboutRecommendation(userInfo, products);

      // Parse JSON từ Gemini (giả sử Gemini trả đúng định dạng)
      let recommendedProducts: RecommendedProduct[] = [];
      try {
        // Bước 1: Tách phần JSON thực sự từ chuỗi có định dạng ```json ... ```
        const jsonString = content.match(/```json\s*([\s\S]*?)\s*```/)?.[1];

        if (!jsonString) {
          throw new Error("JSON content not found in Gemini response.");
        }

        // Bước 2: Parse JSON
        recommendedProducts = JSON.parse(jsonString);

        // Bước 3: Thêm link vào từng sản phẩm
        const productsWithLink = recommendedProducts.map((prod) => ({
          ...prod,
          link: `${BASE_URL}/product/${prod.productId}`,
        }));

        // Bước 4: Trả kết quả
        res.json({ content: productsWithLink });
      } catch (err) {
        console.warn("Failed to parse Gemini response as JSON:", err);
        next({ message: "Can't process response from Gemini." });
      }
    } catch (error: any) {
      console.error("Recommendation error:", error.message);
      next({ message: "System error when recommend." });
    }
  }

  // Tạo câu hỏi tự động về sản phẩm dựa trên các thuộc tính của sản phẩm
  // generateProductQuestions = async (productId) => {
  //   try {
  //     // Lấy dữ liệu sản phẩm từ database
  //     const product = await Product.findById(productId).populate("categories");

  //     if (!product) {
  //       throw new Error("Product not found");
  //     }

  //     // Tạo các câu hỏi dựa trên dữ liệu sản phẩm
  //     const questions = [
  //       `What is the price of the product ${product.product_name}?`,
  //       `What is the discounted price of ${product.product_name}?`,
  //       `What categories does ${product.product_name} belong to?`,
  //       `What is the brand of ${product.product_name}?`,
  //       `What is the description of ${product.product_name}?`,
  //       `What are the available sizes of ${product.product_name}?`, // Giả sử bạn có size trong thuộc tính
  //       `How many units of ${product.product_name} are available in stock?`,
  //       `What is the minimum quantity for purchasing ${product.product_name}?`,
  //       `What attributes are available for ${product.product_name}?`,
  //     ];

  //     // Gửi câu hỏi và thông tin sản phẩm tới API Gemini để lấy câu trả lời
  //     const responses = await Promise.all(
  //       questions.map((question) =>
  //         axios.post(
  //           GEMINI_API_URL,
  //           {
  //             question,
  //             context: product, // Dữ liệu sản phẩm gửi vào để API có thể trả lời chính xác
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${GEMINI_API_KEY}`,
  //             },
  //           }
  //         )
  //       )
  //     );

  //     // Trả về các câu trả lời từ Gemini
  //     const answers = responses.map((response) => response.data.answer);

  //     return answers;
  //   } catch (error) {
  //     console.error("Error generating product questions:", error);
  //     throw new Error("Error generating product questions");
  //   }
  // };
  // /**
  //  * Gửi tin nhắn qua API REST (Không cần nếu dùng WebSocket)
  //  */
  // async sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { sender, receiver, content } = req.body;
  //     if (!sender || !receiver || !content) {
  //       res.status(400).json({ message: "Sender, receiver, and content are required" });
  //       return;
  //     }

  //     const message = await ChatService.saveMessage(sender, receiver, content);
  //     res.status(201).json(message);
  //   } catch (error: any) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  // /**
  //  * Lấy tất cả tin nhắn giữa 2 người dùng
  //  */
  // async getMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { user1, user2 } = req.query;
  //     if (!user1 || !user2) {
  //       res.status(400).json({ message: "User1 and User2 are required" });
  //       return;
  //     }

  //     const messages = await ChatService.getMessagesBetweenUsers(user1 as string, user2 as string);
  //     res.status(200).json(messages);
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // /**
  //  * Lấy tin nhắn theo ID
  //  */
  // async getMessageById(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const message = await ChatService.getMessageById(req.params.id);
  //     if (!message) {
  //       res.status(404).json({ message: "Message not found" });
  //       return;
  //     }
  //     res.status(200).json(message);
  //   } catch (error: any) {
  //     next(error);
  //   }
  // }

  // /**
  //  * Lấy tất cả tin nhắn của một người dùng
  //  */
  // async getMessagesByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const messages = await ChatService.getMessagesByUserId(req.params.id);
  //     res.status(200).json(messages);
  //   } catch (error: any) {
  //     next(error);
  //   }
  // }

  // /**
  //  * Xóa tin nhắn theo ID
  //  */
  // async deleteMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const deleted = await ChatService.deleteMessage(req.params.id);
  //     if (!deleted) {
  //       res.status(404).json({ message: "Message not found" });
  //       return;
  //     }
  //     res.status(200).json({ message: "Message deleted successfully" });
  //   } catch (error: any) {
  //     next(error);
  //   }
  // }

  // async getMessagesByGroup (req: Request, res: Response, next: NextFunction): Promise<void> {
  // const { user1Id, user2Id } = req.params;

  // // Tạo groupId bất biến
  // const groupId = [user1Id, user2Id].sort().join("_");

  // try {
  //   const messages = await ChatService.find({ groupId }).sort({ timestamp: 1 });
  //   res.json(messages);
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to fetch messages" });
  // }
}

export default new ChatController();
