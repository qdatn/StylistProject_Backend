import AttributeService from "@modules/attribute/attribute.service";
import { Request, Response, NextFunction } from "express";

class AttributeController {
  async createAttribute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const attribute = await AttributeService.createAttribute(req.body);
      res.status(201).json(attribute);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAttributeByKey(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const attribute = await AttributeService.getAttributesByKey(
        req.params.key
      );
      if (!attribute) {
        res.status(404).json({ message: "Attribute not found" });
      }
      res.json(attribute);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllAttributes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const attributes = await AttributeService.getAllAttributes();
      res.json(attributes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateAttribute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedAttribute = await AttributeService.updateAttribute(
        req.params.key,
        req.body
      );
      if (!updatedAttribute) {
        res.status(404).json({ message: "Attribute not found" });
      }
      res.json(updatedAttribute);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteAttribute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const deletedAttribute = await AttributeService.deleteAttribute(
        req.params.key
      );
      if (!deletedAttribute) {
        res.status(404).json({ message: "Attribute not found" });
      }
      res.json({ message: "Attribute deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async addValue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const attribute = await AttributeService.addNewValue(
        req.params.key,
        req.body.newValues
      );
      if (!attribute) {
        res.status(404).json({ message: "Attribute not found" });
      }
      res.status(200).json({ message: "Value added successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AttributeController();
