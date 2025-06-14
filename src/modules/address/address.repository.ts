// src/repositories/AddressRepository.ts
import mongoose from "mongoose";
import { AddressDTO } from ".";
import Address from "./address.model";

class AddressRepository {
  async create(addressData: AddressDTO) {
    const address = new Address(addressData);
    return await address.save();
  }

  async findByUserId(userid: string) {
    const id = new mongoose.Types.ObjectId(userid);
    return await Address.find({ user: id })
      .populate("user")
      .sort({ createdAt: -1 });
  }

  async findById(id: string) {
    const _id = new mongoose.Types.ObjectId(id);
    return await Address.findOne({ _id: _id })
      .populate("user")
      .sort({ createdAt: -1 });
  }

  async findAll() {
    return await Address.find().populate("user").sort({ createdAt: -1 });
  }

  async update(id: string, addressData: AddressDTO) {
    return await Address.findByIdAndUpdate(id, addressData, { new: true });
  }

  async delete(id: string) {
    return await Address.findByIdAndDelete(id);
  }
}

export default new AddressRepository();
