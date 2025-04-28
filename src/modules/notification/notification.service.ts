import NotificationModel from "./notification.model";

class NotificationService {
  async createNotification(userId: string, messageId: string, content: string) {
    return await NotificationModel.create({ userId, messageId, content });
  }

  async getNotificationsByUserId(userId: string) {
    return await NotificationModel.find({ userId }).sort({ createdAt: -1 });
  }

  async markAsRead(notificationId: string) {
    return await NotificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true });
  }

  async deleteNotification(notificationId: string) {
    return await NotificationModel.findByIdAndDelete(notificationId);
  }
}

export default new NotificationService();
