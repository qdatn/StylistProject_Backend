import express from "express";
import userInfoController from "../controllers/userInfoController.js";

const router = express.Router();

// Các route cho CRUD UserInfo
router.get("/", userInfoController.getAllUserInfo); // Lấy tất cả UserInfo
router.get("/:id", userInfoController.getUserInfoById); // Lấy UserInfo theo user_id
router.post("/", userInfoController.createUserInfo); // Tạo UserInfo mới
router.put("/:id", userInfoController.updateUserInfo); // Cập nhật UserInfo theo ID
router.delete("/:id", userInfoController.deleteUserInfo); // Xóa UserInfo theo ID

export default router;
