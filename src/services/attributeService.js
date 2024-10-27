import { AttributeRepository } from "../repositories/attributeRepo.js";

export const AttributeService = {
  async createAttribute(attributeData) {
    return await AttributeRepository.create(attributeData);
  },

  async getAttributeByKeyAndValue(key, value) {
    return await AttributeRepository.findOne(key, value);
  },

  async getAllAttributes() {
    return await AttributeRepository.findAll();
  },

  async getAllAttributesByKey(key) {
    return await AttributeRepository.findAllByKey(key);
  },

  async updateAttribute(key, value, updateData) {
    return await AttributeRepository.update(key, value, updateData);
  },

  async deleteAttribute(key, value) {
    return await AttributeRepository.delete(key, value);
  },
};
