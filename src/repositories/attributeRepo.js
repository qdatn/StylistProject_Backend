import Attribute from "../models/attributeModel.js";

export const AttributeRepository = {
  async create(attributeData) {
    return await Attribute.create(attributeData);
  },

  async findOne(key, value) {
    return await Attribute.findOne({ key: key, value: value });
  },

  async findAll() {
    return await Attribute.find();
  },
  async findAllByKey(key) {
    return await Attribute.find({ key: key });
  },

  async update(key, value, updateData) {
    return await Attribute.findOneAndUpdate(
      { key: key, value: value },
      updateData,
      {
        new: true,
      }
    );
  },

  async delete(key, value) {
    return await Attribute.deleteOne({ key: key, value: value });
  },
};
