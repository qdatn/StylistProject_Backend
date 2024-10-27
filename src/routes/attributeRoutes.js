import express from "express";
import { AttributeController } from "../controllers/attributeController.js";

const router = express.Router();

router.post("/", AttributeController.createAttribute);
router.get("/:key/:value", AttributeController.getAttributeByKeyAndValue);
router.get("/", AttributeController.getAllAttributes);
router.get("/:key", AttributeController.getAttributeByKey);
router.put("/:key/:value", AttributeController.updateAttribute);
router.delete("/:key/:value", AttributeController.deleteAttribute);

export default router;
