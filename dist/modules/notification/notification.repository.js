"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_model_1 = __importDefault(require("./notification.model"));
const userInfo_1 = require("../userInfo");
class NotificationRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.find().populate("user");
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
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.findOne({
                // search without casitive
                _id: id,
            });
        });
    }
    create(notificationData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.create(notificationData);
        });
    }
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.findOneAndUpdate({ _id: id }, updateData, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.findByIdAndDelete(id);
        });
    }
    findNotificationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield userInfo_1.UserInfo.findOne({ user: userId });
            if (!userInfo)
                return [];
            // B2: Tìm tất cả notification có chứa userInfo._id
            // const notifications = await Notification.find({
            //   user: userInfo._id,
            // }).populate("user"); 
            const notifications = yield notification_model_1.default.find({
                $or: [
                    { user: userInfo._id },
                    { user: { $exists: false } },
                    { user: { $size: 0 } },
                ],
            }).populate("user");
            return notifications;
        });
    }
}
exports.default = new NotificationRepository();
//# sourceMappingURL=notification.repository.js.map