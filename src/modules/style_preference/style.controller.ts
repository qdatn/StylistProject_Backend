import { NextFunction, Request, Response } from "express";
import StylePreferenceService from "./style.service";

class StylePreferenceController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await StylePreferenceService.create(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await StylePreferenceService.getAll();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await StylePreferenceService.getById(req.params.id);
      if (!result) {
        res.status(404).json({ message: "Style preference not found" });
      } else {
        res.status(200).json(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await StylePreferenceService.update(
        req.params.id,
        req.body
      );
      if (!result) {
        res.status(404).json({ message: "Style preference not found" });
      } else {
        res.status(200).json(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await StylePreferenceService.delete(req.params.id);
      if (!result) {
        res.status(404).json({ message: "Style preference not found" });
      } else {
        res.status(200).json({ message: "Deleted successfully" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getAnalytics(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const analyticsData = await StylePreferenceService.getAnalytics();
      res.status(200).json({ data: analyticsData });
    } catch (error: any) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new StylePreferenceController();
