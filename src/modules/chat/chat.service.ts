import Message, { IMessage } from "./chat.model";

class ChatService {
  /**
   * Lưu tin nhắn vào database
   */
  public async saveMessage(sender: string, receiver: string, content: string): Promise<IMessage> {
    const message = new Message({ sender, receiver, content });
    return await message.save();
  }

  /**
   * Lấy tất cả tin nhắn giữa 2 người dùng
   */
  public async getMessagesBetweenUsers(user1: string, user2: string): Promise<IMessage[]> {
    return await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ timestamp: 1 });
  }

  /**
   * Lấy tin nhắn theo ID
   */
  public async getMessageById(id: string): Promise<IMessage | null> {
    return await Message.findById(id);
  }

  /**
   * Lấy tất cả tin nhắn của một người dùng
   */
  public async getMessagesByUserId(userId: string): Promise<IMessage[]> {
    return await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ timestamp: -1 });
  }

  /**
   * Xóa tin nhắn theo ID
   */
  public async deleteMessage(id: string): Promise<boolean> {
    const deleted = await Message.findByIdAndDelete(id);
    return !!deleted;
  }
}

export default new ChatService();
