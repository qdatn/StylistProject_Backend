// server.js
// routes/user.js (ES module)
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config"; // Để load biến môi trường từ file .env

// dotenv.config();

import connectDB from "./configs/database.js"; // DB
import userRoutes from "./routes/userRoutes.js";
import passport from "passport";
import session from "express-session";
import authRouter from "./routes/auth.js";

const router = express.Router();

const app = express();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Bật CORS cho toàn bộ các route
app.use(morgan("dev")); // Ghi log request
app.use(express.json()); // Parse JSON request body

app.use(express.json());
app.use(session({ secret: "SECRET", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Route đơn giản
app.get("/", (req, res) => {
  res.send("Hello, World! Express.js is working!");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/auth", authRouter);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
