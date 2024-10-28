import express from "express";
import { cartController } from "../controllers/cartController.js";

const router = express.Router();
    
router.post("/", cartController.createCart);
router.get("/", cartController.getAllCart);
router.get("/:id", cartController.getCartByUserId);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

export default router;
