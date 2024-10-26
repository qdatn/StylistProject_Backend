import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// POST /register - Register a new user
router.post("/register", authController.register);

// POST /login - Login and generate JWT token
router.post("/login", authController.login);

//UPDATE
router.put("/:id", authController.updateUser);
//DELETE
router.delete("/:id", authController.deleteUser);

export default router;
