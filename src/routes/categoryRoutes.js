// routes/categoryRoutes.js
import express from "express";
import categoryController from "../controllers/categoryController.js";

const router = express.Router();

// Các route cho CRUD
router.get("/", categoryController.getAllCategories); // Lấy tất cả category
router.get("/:name", categoryController.getCategoryByName); // Lấy category theo ID
router.post("/", categoryController.createCategory); // Tạo category mới
router.post("/categories", categoryController.createManyCategories); // Tạo nhiều category
router.put("/:name", categoryController.updateCategory); // Cập nhật category theo ID
router.delete("/:name", categoryController.deleteCategory); // Xóa category theo ID

export default router;
