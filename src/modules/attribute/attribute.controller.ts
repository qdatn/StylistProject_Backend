import { pagination } from "@core/middlewares";
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
      next(error);
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
      } else {
        res.status(200).json(attribute);
      }
    } catch (error: any) {
      next(error);
    }
  }

  async getAllAttributes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const attributes = await AttributeService.getAllAttributes();
      await pagination(req, res, attributes, next);
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      next(error);
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
      } else {
        res.json(updatedAttribute);
      }
    } catch (error: any) {
      next(error);
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
      } else {
        res.status(200).json({ message: "Attribute deleted successfully" });
      }
    } catch (error: any) {
      next(error);
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
        req.body.values
      );
      if (!attribute) {
        res.status(404).json({ message: "Attribute not found" });
      } else {
        res
          .status(200)
          .json({ attribute, message: "Value added successfully" });
      }
    } catch (error: any) {
      next(error);
    }
  }

  async deleteValue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const attribute = await AttributeService.deleteValue(
        req.params.key,
        req.body.values
      );
      if (!attribute) {
        res.status(404).json({ message: "Attribute not found" });
      } else {
        res
          .status(200)
          .json({ attribute, message: "Value added successfully" });
      }
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AttributeController();
