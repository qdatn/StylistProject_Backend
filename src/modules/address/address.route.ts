import { Router } from "express";
import AddressController from "./address.controller";
import RouteInterface from "@core/interfaces/route.interface";

class AttributeRoute implements RouteInterface {
  public path = "/api/address";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, AddressController.createAddress);
    this.router.get(`${this.path}/`, AddressController.getAllAddresses);
    this.router.get(
      `${this.path}/user/:userid`,
      AddressController.getAddressUserById
    );
    this.router.get(`${this.path}/:id`, AddressController.getAddressById);
    this.router.put(`${this.path}/:id`, AddressController.updateAddress);
    this.router.delete(`${this.path}/:id`, AddressController.deleteAddress);
  }
}

export default new AttributeRoute();
