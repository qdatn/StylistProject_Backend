import { Model } from "mongoose";
import Notification from "./notification.model";
import NotificationDto from "./dtos/notification.dto";

class NotificationRepository {
  async findAll() {
    return await Notification.find();
  }

  async findById(id: string) {
    return await Notification.findOne({
      // search without casitive
      _id: id
    });
  }

  async create(notificationData: NotificationDto) {
    return await Notification.create(notificationData);
  }


  async update(
    id: string,
    updateData: NotificationDto) {
    return await Notification.findOneAndUpdate({ _id: id }, updateData, { new: true });
  }

  async delete(id: string) {
    return await Notification.findByIdAndDelete(id);
  }
}

export default new NotificationRepository();