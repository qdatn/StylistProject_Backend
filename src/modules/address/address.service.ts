// src/services/AddressService.ts
import AddressRepository from "./address.repository";
import AddressDTO from "./dtos/address.dto";
class AddressService {
  async createAddress(addressData: AddressDTO) {
    return await AddressRepository.create(addressData);
  }

  async getAddressUserById(id: string) {
    return await AddressRepository.findByUserId(id);
  }

  async getAddressById(id: string) {
    return await AddressRepository.findById(id);
  }

  async getAllAddresses() {
    return await AddressRepository.findAll();
  }

  async updateAddress(id: string, addressData: AddressDTO) {
    return await AddressRepository.update(id, addressData);
  }

  async deleteAddress(id: string) {
    return await AddressRepository.delete(id);
  }
}

export default new AddressService();
