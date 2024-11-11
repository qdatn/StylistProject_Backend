// controllers/userInfoController.js
import { pagination } from "@core/middlewares";
import userInfoService from "@modules/userInfo/userInfo.service";
import { NextFunction, Request, Response } from "express";

class UserInfoController {
  async getAllUserInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userInfos = await userInfoService.getAllUserInfos();
      await pagination(req, res, userInfos, next);
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserInfoById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userInfo = await userInfoService.getUserInfoById(req.params.id);
      if (!userInfo) {
        res.status(404).json({ message: "UserInfo not found" });
      }
      res.status(200).json(userInfo);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUserInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userInfo = await userInfoService.createUserInfo(req.body);
      res.status(201).json(userInfo);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUserInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedUserInfo = await userInfoService.updateUserInfo(
        req.params.id,
        req.body
      );
      if (!updatedUserInfo) {
        res.status(404).json({ message: "UserInfo not found" });
      }
      res.status(200).json(updatedUserInfo);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUserInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const deletedUserInfo = await userInfoService.deleteUserInfo(
        req.params.id
      );
      if (!deletedUserInfo) {
        res.status(404).json({ message: "UserInfo not found" });
      }
      res.status(200).json({ message: "UserInfo deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserInfoController();
