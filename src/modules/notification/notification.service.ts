import { NotificationRepository } from ".";
import NotificationDto from "./dtos/notification.dto";


class NotificationService {
  async createNotification(data: NotificationDto) {
    return NotificationRepository.create(data);
  }

  async getAllNotifications() {
    return await NotificationRepository.findAll();
  }
  
  // async getUserNotifications(
  //   userId: string,
  //   filters: any = {},
  //   page: number = 1,
  //   limit: number = 10
  // ) {
  //   const skip = (page - 1) * limit;
  // const [notifications, total] = await Promise.all([
  //   NotificationRepository.findByUserId(userId, filters, skip, limit),
  //   NotificationRepository.countDocuments({ userId, ...filters })
  // ]);

  // return {
  //   notifications,
  //   total,
  //   page,
  //   totalPages: Math.ceil(total / limit)
  // };
  // }

  // async markAsRead(notificationId: string, userId: string) {
  //   return NotificationRepository.updateById(notificationId, {
  //     status: 'read',
  //     readAt: new Date()
  //   });
  // }

  async updateNotification(
    id: string,
    data : NotificationDto
  ) {
    return await NotificationRepository.update(id, data);
  }

  async deleteNotification(id: string) {
    return NotificationRepository.delete(id);
  }

  async getNotificationById(id: string) {
    return NotificationRepository.findById(id);
  }

  // async getAllNotifications(
  //   filters: any = {},
  //   page: number = 1,
  //   limit: number = 10
  // ) {
  //   const skip = (page - 1) * limit;
  //   const [notifications, total] = await Promise.all([
  //     NotificationRepository.findByUserId('', filters, skip, limit),
  //     NotificationRepository.countDocuments(filters)
  //   ]);

  //   return {
  //     notifications,
  //     total,
  //     page,
  //     totalPages: Math.ceil(total / limit)
  //   };
  // }


}

export default new NotificationService();