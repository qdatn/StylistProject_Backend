import Attribute from "./attribute.model";
import AttributeDTO from "./dtos/attribute.dto";

class AttributeRepository {
  async create(attributeData: AttributeDTO) {
    return await Attribute.create(attributeData);
  }

  async findOne(key: string) {
    return await Attribute.findOne({ key: key }).sort({ createdAt: -1 });
  }

  async findAll() {
    return await Attribute.find().sort({ createdAt: -1 });
  }

  async update(key: string, updateData: AttributeDTO) {
    return await Attribute.findOneAndUpdate({ key: key }, updateData, {
      new: true,
    });
  }

  async delete(key: string) {
    return await Attribute.deleteOne({ key: key });
  }

  async addValue(key: string, newValues: string[]) {
    return await Attribute.findOneAndUpdate(
      { key: key },
      { $addToSet: { value: { $each: newValues } } },
      {
        new: true,
      }
    );
  }

  async deleteValue(key: string, newValues: string[]) {
    return await Attribute.findOneAndUpdate(
      { key: key },
      { $pull: { value: { $in: newValues } } },
      {
        new: true,
      }
    );
  }
}

export default new AttributeRepository();
