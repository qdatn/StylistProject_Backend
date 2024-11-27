import AttributeRepository from "./attribute.repository";
import AttributeDTO from "./dtos/attribute.dto.js";

class AttributeService {
  async createAttribute(attributeData: AttributeDTO) {
    return await AttributeRepository.create(attributeData);
  }

  async getAttributesByKey(key: string) {
    return await AttributeRepository.findOne(key);
  }

  async getAllAttributes() {
    return await AttributeRepository.findAll();
  }

  async updateAttribute(key: string, updateData: AttributeDTO) {
    return await AttributeRepository.update(key, updateData);
  }

  async deleteAttribute(key: string) {
    return await AttributeRepository.delete(key);
  }

  async addNewValue(key: string, newValues: string[]) {
    // const attribute: AttributeDTO = (await AttributeRepository.findOne(
    //   key
    // )) as AttributeDTO;

    // const values = attribute.value ?? [];
    // newValues.forEach((value) => {
    //   if (!values.includes(value)) {
    //     values.push(value);
    //   }
    // });
    return await AttributeRepository.addValue(key, newValues);
  }

  async deleteValue(key: string, values: string[]) {
    // const attribute: AttributeDTO = (await AttributeRepository.findOne(
    //   key
    // )) as AttributeDTO;

    // const values = attribute.value ?? [];
    // newValues.forEach((value) => {
    //   if (!values.includes(value)) {
    //     values.push(value);
    //   }
    // });
    return await AttributeRepository.deleteValue(key, values);
  }
}

export default new AttributeService();
