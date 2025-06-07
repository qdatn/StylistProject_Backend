import { Model } from "mongoose";
import Notification from "./notification.model";
import NotificationDto from "./dtos/notification.dto";
import { UserInfo } from "@modules/userInfo";

class NotificationRepository {
  async findAll() {
    return await Notification.find().populate("user").sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return await Notification.findOne({
      // search without casitive
      _id: id,
    }).sort({ createdAt: -1 });
  }

  async create(notificationData: NotificationDto) {
    return await Notification.create(notificationData);
  }

  async update(id: string, updateData: NotificationDto) {
    return await Notification.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });
  }

  async delete(id: string) {
    return await Notification.findByIdAndDelete(id);
  }

  async findNotificationsByUserId(userId: string) {
    const userInfo = await UserInfo.findOne({ user: userId });

    if (!userInfo) return [];

    // B2: Tìm tất cả notification có chứa userInfo._id
    // const notifications = await Notification.find({
    //   user: userInfo._id,
    // }).populate("user");

    const notifications = await Notification.find({
      $or: [
        { user: userInfo._id },
        { user: { $exists: false } },
        { user: { $size: 0 } },
      ],
    }).populate("user").sort({ createdAt: -1 });

    return notifications;
  }
}

export default new NotificationRepository();
