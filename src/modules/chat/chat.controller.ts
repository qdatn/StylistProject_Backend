import { Request, Response, NextFunction } from "express";
import ChatService from "./chat.service";

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
