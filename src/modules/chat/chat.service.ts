import { Product, ProductService } from "@modules/product";
import { ChatModel } from ".";
import Message, { IMessage } from "./chat.model";
import { askGeminiAboutProduct } from "./gemini.service";
import mongoose from "mongoose";

class ChatService {
  public async saveMessage(
    sender: string,
    receiver: string,
    content: string
  ): Promise<IMessage> {
    const message = new Message({ sender, receiver, content });
    return await message.save();
  }

  public async getMessagesBetweenUsers(
    user1Id: string,
    user2Id: string
  ): Promise<IMessage[]> {
    const groupId = [user1Id, user2Id].sort().join("_");
    const messages = await Message.find({ groupId }).sort({ timestamp: 1 });
    return messages;
  }

  public async getMessageById(id: string): Promise<IMessage | null> {
    return await Message.findById(id);
  }

  public async getMessagesByUserId(userId: string): Promise<IMessage[]> {
    return await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ timestamp: -1 });
  }

  public async deleteMessage(id: string): Promise<boolean> {
    const deleted = await Message.findByIdAndDelete(id);
    return !!deleted;
  }

  public async generateProductAnswer(productId: string, question: string) {
    const product = await ProductService.getProductById(productId);
    console.log("productId received:", product);
    console.log("Checking in DB for ID:", product?._id);
    if (!product) {
      throw new Error("Product not found");
    }

    const answer = await askGeminiAboutProduct(question, product);

    return answer;
  }
}

export default new ChatService();
