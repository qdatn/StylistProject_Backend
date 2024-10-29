import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for the E-Commerce backend",
    },
  },
  tags: [
    {
      name: "Admin",
      description: "API for admin-related operations",
    },
    {
      name: "Customer",
      description: "API for customer-related operations",
    },
  ],
  security: [
    {
      BearerAuth: [],
    },
  ],
  apis: [
    "src/apis/*.js", // Đường dẫn tới các file chứa chú thích Swagger
    "src/routes/*.js", // Đường dẫn tới file route để ghi chú thêm (nếu có)
    "src/routes/**/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
