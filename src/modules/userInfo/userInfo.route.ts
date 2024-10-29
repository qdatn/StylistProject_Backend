import { Router } from "express";
import UserInfoController from "@modules/userInfo/userInfo.controller";
import IRoute from "@core/interfaces/route.interface";

class UserInfoRoute implements IRoute {
  public path = "/api/v1/auth";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", UserInfoController.getAllUserInfo); // Lấy tất cả UserInfo
    this.router.get("/:id", UserInfoController.getUserInfoById); // Lấy UserInfo theo user_id
    this.router.post("/", UserInfoController.createUserInfo); // Tạo UserInfo mới
    this.router.put("/:id", UserInfoController.updateUserInfo); // Cập nhật UserInfo theo ID
    this.router.delete("/:id", UserInfoController.deleteUserInfo); // Xóa UserInfo theo ID
    // this.router.put(`${this.path}/:id`, AuthController.updateUser);
    // this.router.delete(`${this.path}/:id`, AuthController.deleteUser);
  }
}

export default new UserInfoRoute();
