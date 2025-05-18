import { Request, Response, NextFunction } from "express";
import { pagination } from "@core/middlewares";
import { NotificationService } from ".";

class NotificationController {
  async createNotification(req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const notification = await NotificationService.createNotification(req.body);
      res.status(201).json(notification);
    } catch (error) {
      next(error);
    }
  }

  // async getUserNotifications(req: Request, res: Response) {
  //   const result = await notificationService.getUserNotifications(
  //     req.user.id,
  //     req.query,
  //     Number(req.query.page),
  //     Number(req.query.limit)
  //   );
  //   res.json(result);
  // }

  async getNotificationDetails(req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const notification = await NotificationService.getNotificationById(req.params.id);
      if (!notification) {
        res.status(404).json({ message: "Notification not found" });
      } else {
        res.status(200).json(notification);
      }
    } catch (error) {
      next(error);
    }
  }

  // async markAsRead(req: Request, res: Response) {
  //   const notification = await NotificationService.markAsRead(
  //     req.params.id,
  //     req.user.id
  //   );
  //   res.json(notification);
  // }

  async updateNotification(req: Request, res: Response) {
    const updatedNotification = await NotificationService.updateNotification(
      req.params.id,
      req.body
    );
    res.json(updatedNotification);
  }

  async deleteNotification(req: Request, res: Response) {
    await NotificationService.deleteNotification(req.params.id);
    res.json({ message: "Notification deleted successfully" });
  }

  async getAllNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const notifications = await NotificationService.getAllNotifications();
      await pagination(req, res, notifications, next);
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new NotificationController();