import express, { Application } from "express";
import AuthRoute from "@modules/auth/auth.route"; // Đảm bảo đường dẫn này chính xác
import bodyParser from "body-parser";
import IRoute from "@core/interfaces/route.interface";
import ConnectDB from "@core/configs/database";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config"; // Để load biến môi trường từ file .env
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "@core/middlewares";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

export default class App {
  public app: Application;
  public port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.ConnectToDB();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        // origin: [
        //   "http://localhost:3000",
        //   "https://stylist-project-frontend-3fb7r4the-qdatns-projects.vercel.app",
        // ], // Địa chỉ frontend
        origin: function (origin, callback) {
          if (
            !origin || // allow requests with no origin, like mobile apps or curl requests
            origin === "http://localhost:3000" ||
            "http://localhost:5000" ||
            /vercel\.app$/.test(origin) // allow any origin ending with 'vercel.app'
          ) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        optionsSuccessStatus: 200, // for legacy browser support
        methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức cho phép
        credentials: true, // Nếu cần gửi cookie hoặc header đặc biệt
      })
    ); // Bật CORS cho toàn bộ các route
    this.app.use(morgan("dev")); // Ghi log request
    this.app.use(express.json()); // Parse JSON request body
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(errorMiddleWare);

    // SWAGGER CONFIG
    const options: Options = {
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
    this.app.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerJSDoc(options))
    );
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private ConnectToDB() {
    ConnectDB();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
