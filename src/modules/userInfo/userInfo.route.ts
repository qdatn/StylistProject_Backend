import { Router } from "express";
import UserInfoController from "@modules/userInfo/userInfo.controller";
import IRoute from "@core/interfaces/route.interface";

class UserInfoRoute implements IRoute {
  public path = "/api/v1/userinfo";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, UserInfoController.getAllUserInfo); // Lấy tất cả UserInfo
    this.router.get(`${this.path}/:id`, UserInfoController.getUserInfoById); // Lấy UserInfo theo user_id
    this.router.post(`${this.path}/`, UserInfoController.createUserInfo); // Tạo UserInfo mới
    this.router.put(`${this.path}/:id`, UserInfoController.updateUserInfo); // Cập nhật UserInfo theo ID
    this.router.delete(`${this.path}/:id`, UserInfoController.deleteUserInfo); // Xóa UserInfo theo ID
    // this.router.put(`${this.path}/:id`, AuthController.updateUser);
    // this.router.delete(`${this.path}/:id`, AuthController.deleteUser);
  }
}

export default new UserInfoRoute();
