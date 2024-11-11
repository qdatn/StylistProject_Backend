/*-------------------- User Model --------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user (generated by MongoDB)
 *           example: 64a5f4b2b6a82d2f55f9e7b0
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           description: User's password (hashed)
 *           example: "123456"
 *         role:
 *           type: string
 *           description: User's role in the application (e.g., "admin" or "cstomer")
 *           example: "customer"
 *       timestamps:
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 */

/*-------------------- RegisterDto for register API --------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *         - otp
 *       properties:
 *         name:
 *           type: string
 *           description: User's Name
 *           example: "Nguyen Van A"
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           description: User's password (hashed)
 *           example: "123456"
 *         role:
 *           type: string
 *           description: User's role in the application (e.g., "admin" or "customer")
 *           example: "customer"
 *         otp:
 *           type: string
 *           description: otp verification
 *           example: "123456"
 *       timestamps:
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 */

/*-------------------- LoginDTO for register API --------------------*/
// LoginDto for login API
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           description: User's password (hashed)
 *           example: "123456"
 */

/*-------------------- Register Account API --------------------*/
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system with an email, password, and role.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterDto'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error message"
 */

/*-------------------- Login API --------------------*/
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in a user and returns a token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The user object containing login info
 *                   example:
 *                     _id: "60b8c3a4930f5b0f35f3b413"
 *                     email: "user@example.com"
 *                     role: "customer"
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 */
