"use strict";
/*-------------------- Attribute Model --------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Attribute:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the attribute.
 *           example: "507f191e810c19729de860ea"
 *         key:
 *           type: string
 *           description: The key of the attribute (e.g., "color", "size").
 *           example: "color"
 *         value:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of possible values for the attribute.
 *           example: ["red", "blue", "green"]
 *       required:
 *         - key
 *         - value
 */
/*-------------------- Attribute dto --------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     AttributeDTO:
 *       type: object
 *       properties:
 *         key:
 *           type: string
 *           description: The key of the attribute (e.g., "color", "size").
 *           example: "color"
 *         value:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of possible values for the attribute.
 *           example: ["red", "blue", "green"]
 *       required:
 *         - key
 *         - value
 */
/*-------------------- Create Attribute API --------------------*/
/**
 * @swagger
 * /api/attribute:
 *   post:
 *     summary: Create a new attribute
 *     tags:
 *       - Attributes
 *     description: Adds a new attribute to the system using the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttributeDTO'
 *     responses:
 *       201:
 *         description: Attribute created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttributeDTO'
 *       400:
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
/*-------------------- Get Attribute by Key API --------------------*/
/**
 * @swagger
 * /api/attribute/{key}:
 *   get:
 *     summary: Get attribute by key
 *     tags:
 *       - Attributes
 *     description: Retrieves an attribute based on the provided key.
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         description: The key of the attribute (e.g., "color", "size").
 *         schema:
 *           type: string
 *           example: "color"
 *     responses:
 *       200:
 *         description: Successfully retrieved the attribute.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttributeDTO'
 *       404:
 *         description: Attribute not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Attribute not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
/*-------------------- Get All Attribute API --------------------*/
/**
 * @swagger
 * /api/attribute/:
 *   get:
 *     summary: Get all attributes with pagination
 *     tags:
 *       - Attributes
 *     description: Retrieves all attributes with pagination support. You can specify the page and limit in the query parameters.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of items per page (default is 10).
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved all attributes with pagination metadata.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AttributeDTO'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       description: Total number of attributes in the database.
 *                       example: 100
 *                     currentPage:
 *                       type: integer
 *                       description: The current page number.
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages.
 *                       example: 10
 *                     pageSize:
 *                       type: integer
 *                       description: Number of attributes per page.
 *                       example: 10
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
/*-------------------- Update Attribute API --------------------*/
/**
 * @swagger
 * /api/attribute/{key}:
 *   put:
 *     summary: Update an existing attribute by its key
 *     tags:
 *       - Attributes
 *     description: Updates an attribute based on the provided key. You must provide the updated data in the request body.
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         description: The key of the attribute you want to update (e.g., "color").
 *         schema:
 *           type: string
 *           example: "color"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttributeDTO'
 *     responses:
 *       200:
 *         description: Successfully updated the attribute.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttributeDTO'
 *       404:
 *         description: Attribute not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Attribute not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
/*-------------------- Delete Attribute API --------------------*/
/**
 * @swagger
 * /api/attribute/{key}:
 *   delete:
 *     summary: Delete an attribute by its key
 *     tags:
 *       - Attributes
 *     description: Deletes an attribute based on the provided key. If the attribute is not found, a 404 response will be returned.
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         description: The key of the attribute you want to delete (e.g., "color").
 *         schema:
 *           type: string
 *           example: "color"
 *     responses:
 *       200:
 *         description: Successfully deleted the attribute.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Attribute deleted successfully"
 *       404:
 *         description: Attribute not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Attribute not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
/*-------------------- Add value into Existed Attribute key API --------------------*/
/**
 * @swagger
 * /api/attribute/{key}/addValues:
 *   put:
 *     summary: Add new value to an attribute
 *     tags:
 *       - Attributes
 *     description: Adds new values to an attribute's value array based on the provided key. If the attribute is not found, a 404 response will be returned.
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         description: The key of the attribute to which new values will be added (e.g., "color").
 *         schema:
 *           type: string
 *           example: "color"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *               newValues:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["red", "blue"]
 *     responses:
 *       200:
 *         description: Successfully added new values to the attribute.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Value added successfully"
 *       404:
 *         description: Attribute not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Attribute not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */ 
//# sourceMappingURL=attribute-doc.js.map