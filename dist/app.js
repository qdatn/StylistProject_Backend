"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./core/configs/database"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config"); // Để load biến môi trường từ file .env
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares_1 = require("./core/middlewares");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const http_1 = require("http"); // Import HTTP server
const socket_io_1 = __importDefault(require("socket.io")); // Import Socket.IO
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        this.server = (0, http_1.createServer)(this.app); // Tạo HTTP server từ Express
        // this.wss = new WebSocketServer({ server: this.server }); // Tạo WebSocket Server
        this.io = new socket_io_1.default.Server(this.server); // Tạo Socket.IO Server
        // this.io = new socketIO.Server(this.server, {
        //   cors: {
        //     origin: function (origin, callback) {
        //       if (
        //         !origin ||
        //         origin === "http://localhost:3000" ||
        //         origin === "http://localhost:5000" ||
        //         /vercel\.app$/.test(origin)
        //       ) {
        //         callback(null, true);
        //       } else {
        //         callback(new Error("Not allowed by CORS"));
        //       }
        //     },
        //     methods: ["GET", "POST"], // Các phương thức cho phép
        //     credentials: true,
        //   },
        // }); // Tạo Socket.IO Server
        this.ConnectToDB();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        // this.initializeWebSocket(); // Khởi tạo WebSocket
        this.initializeSocketIO(); // Khởi tạo Socket.IO
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({
            // origin: [
            //   "http://localhost:3000",
            //   "https://stylist-project-frontend-3fb7r4the-qdatns-projects.vercel.app",
            // ], // Địa chỉ frontend
            origin: function (origin, callback) {
                if (!origin || // allow requests with no origin, like mobile apps or curl requests
                    origin === "http://localhost:3000" ||
                    "http://localhost:5000" ||
                    /vercel\.app$/.test(origin) // allow any origin ending with 'vercel.app'
                ) {
                    callback(null, true);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            optionsSuccessStatus: 200, // for legacy browser support
            methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức cho phép
            credentials: true, // Nếu cần gửi cookie hoặc header đặc biệt
        })); // Bật CORS cho toàn bộ các route
        this.app.use((0, morgan_1.default)("dev")); // Ghi log request
        this.app.use(express_1.default.json({
        // limit: "50mb"
        })); // Parse JSON request body
        this.app.use(body_parser_1.default.json({
            // limit: "50mb",
            type: "application/json",
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(body_parser_1.default.urlencoded({
            // limit: "50mb",
            extended: true,
            // parameterLimit: 50000,
            type: "application/x-www-form-urlencoded",
        }));
        this.app.use(body_parser_1.default.text({
        //  limit: "200mb"
        }));
        this.app.use(middlewares_1.errorMiddleWare);
        // SWAGGER CONFIG
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Stylist Ecommerce API",
                    version: "1.0.0",
                    description: "API documentation for Stylist Ecommerce",
                },
                components: {
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                        },
                    },
                },
                security: {
                    BearerAuth: [],
                },
                servers: [
                    {
                        url: "http://localhost:5000",
                        description: "API server",
                    },
                ],
            },
            apis: ["./routes.ts", "./src/**/*.ts"],
        };
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(options)));
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    }
    ConnectToDB() {
        (0, database_1.default)();
    }
    // initializeWebSocket
    // private initializeWebSocket() {
    //   this.wss.on("connection", (ws) => {
    //     console.log("New WebSocket connection");
    //     ws.on("message", (message) => {
    //       console.log(`Received: ${message}`);
    //       // Gửi lại tin nhắn cho tất cả client kết nối
    //       this.wss.clients.forEach((client) => {
    //         if (client.readyState === ws.OPEN) {
    //           client.send(`Server received: ${message}`);
    //         }
    //       });
    //     });
    //     ws.on("close", () => {
    //       console.log("WebSocket connection closed");
    //     });
    //   });
    // }
    // initializeSocketIO
    initializeSocketIO() {
        this.io.on("connection", (socket) => {
            console.log("New WebSocket connection");
            socket.on("message", (message) => {
                console.log(`Received: ${message}`);
                // Gửi lại tin nhắn cho tất cả client kết nối
                this.io.sockets.emit("message", `Server received: ${message}`);
            });
            socket.on("disconnect", () => {
                console.log("WebSocket connection closed");
            });
        });
    }
    listen() {
        // this.app.listen(this.port, () => {
        //   console.log(`Server is running on port ${this.port}`);
        // });
        this.server.listen(this.port, () => {
            console.log(`✅ Server is running on port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map