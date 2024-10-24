import express from "express";
import commentController from "../controllers/commentController.js";

const router = express.Router();

router.post("/", commentController.createComment);
router.get("/", commentController.getAllComments);
router.get("/search", commentController.search); // New search endpoint
router.get("/:id", commentController.getAllComments);
router.get("/product/:id", commentController.getCommentByProductId);
router.get("/user/:id", commentController.getCommentByUserId);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

export default router;
