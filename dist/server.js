"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Để load biến môi trường từ file .env
const app_1 = __importDefault(require("./app"));
// dotenv.config();
const routes_1 = require("@/routes");
// import userRoutes from "./routes/userRoutes.js";
// import passport from "passport";
// import session from "express-session";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import userInfoRoutes from "./routes/userInfoRoutes.js";
// import commentRoutes from "./routes/commentRoutes.js";
// import attributeRoutes from "./routes/attributeRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// Import file cấu hình Swagger
// import swaggerSpec from "./configs/swagger.js";
// import swaggerUi from "swagger-ui-express";
// const router = express.Router();
// const PORT = process.env.PORT || 3000;
// const app = express();
// app.use(express.json());
// Connect to MongoDB
// connectDB();
// Tích hợp Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Middleware
// app.use(
//   cors({
//     // origin: [
//     //   "http://localhost:3000",
//     //   "https://stylist-project-frontend-3fb7r4the-qdatns-projects.vercel.app",
//     // ], // Địa chỉ frontend
//     origin: function (origin, callback) {
//       if (
//         !origin || // allow requests with no origin, like mobile apps or curl requests
//         origin === "http://localhost:3000" ||
//         /vercel\.app$/.test(origin) // allow any origin ending with 'vercel.app'
//       ) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     optionsSuccessStatus: 200, // for legacy browser support
//     methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức cho phép
//     credentials: true, // Nếu cần gửi cookie hoặc header đặc biệt
//   })
// ); // Bật CORS cho toàn bộ các route
// app.use(morgan("dev")); // Ghi log request
// app.use(express.json()); // Parse JSON request body
// // Route đơn giản
// app.get("/", (req, res) => {
//   res.send("Hello, World! Express.js is working!");
// });
// Auth route
// app.use("/api/auth", authRoutes);
// Routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/userinfo", userInfoRoutes);
// app.use("/api/comment", commentRoutes);
// app.use("/api/attribute", attributeRoutes);
// app.use("/api/cart", cartRoutes);
const routes = [routes_1.AuthRoute, routes_1.UserInfoRoute];
const app = new app_1.default(routes);
app.listen();
// routes.forEach((route) => {
//   app.use(route.path, route.router); // Gán path và router
// });
// export default app;
// // Khởi động server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
//# sourceMappingURL=server.js.map