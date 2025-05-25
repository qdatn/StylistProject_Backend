import { Model } from "mongoose";
import Notification from "./notification.model";
import NotificationDto from "./dtos/notification.dto";

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
}

export default new NotificationRepository();
