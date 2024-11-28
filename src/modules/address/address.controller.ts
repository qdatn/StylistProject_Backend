// src/controllers/AddressController.ts
import { Request, Response, NextFunction } from "express";
import AddressService from "./address.service";

class AddressController {
  async createAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const address = await AddressService.createAddress(req.body);
      res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  }

  async getAddressUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const address = await AddressService.getAddressUserById(
        req.params.userid
      );
      if (!address) {
        res.status(404).json({ error: "Address not found" });
      } else {
        res.json(address);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAddressById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const address = await AddressService.getAddressById(req.params.id);
      if (!address) {
        res.status(404).json({ error: "Address not found" });
      } else {
        res.json(address);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllAddresses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const addresses = await AddressService.getAllAddresses();
      res.json(addresses);
    } catch (error) {
      next(error);
    }
  }

  async updateAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const address = await AddressService.updateAddress(
        req.params.id,
        req.body
      );
      if (!address) {
        res.status(404).json({ error: "Address not found" });
      } else {
        res.json(address);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const address = await AddressService.deleteAddress(req.params.id);
      if (!address) {
        res.status(404).json({ error: "Address not found" });
      } else {
        res.json({ message: "Address deleted successfully" });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new AddressController();
