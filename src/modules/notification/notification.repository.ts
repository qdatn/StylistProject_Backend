import { Model } from "mongoose";
import Notification from "./notification.model";
import NotificationDto from "./dtos/notification.dto";
import { UserInfo } from "@modules/userInfo";

class NotificationRepository {
  async findAll() {
    return await Notification.find().populate("user");
    // return await Notification.aggregate([
    //   {
    //     $lookup: {
    //       from: "userinfos", // tên collection (viết thường và thêm "s")
    //       localField: "user", // Notification.user
    //       foreignField: "user", // UserInfo.user
    //       as: "userInfo",
    //     },
    //   },
    //   // {
    //   //   $unwind: {
    //   //     path: "$user",
    //   //     preserveNullAndEmptyArrays: true, // nếu không tìm thấy UserInfo
    //   //   },
    //   // },
    //   {
    //     $lookup: {
    //       from: "orders", // nếu bạn cũng muốn populate thêm "order"
    //       localField: "order",
    //       foreignField: "_id",
    //       as: "order",
    //     },
    //   },
    //   // {
    //   //   $unwind: {
    //   //     path: "$order",
    //   //     preserveNullAndEmptyArrays: true,
    //   //   },
    //   // },
    // ]);
  }

  async findById(id: string) {
    return await Notification.findOne({
      // search without casitive
      _id: id,
    });
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
    }).populate("user");

    return notifications;
  }
}

export default new NotificationRepository();
