import { AttributeService } from "../services/attributeService.js";

export const AttributeController = {
  async createAttribute(req, res) {
    try {
      const attribute = await AttributeService.createAttribute(req.body);
      res.status(201).json(attribute);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAttributeByKeyAndValue(req, res) {
    try {
      const attribute = await AttributeService.getAttributeByKeyAndValue(
        req.params.key,
        req.params.value
      );
      if (!attribute) {
        return res.status(404).json({ message: "Attribute not found" });
      }
      res.json(attribute);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllAttributes(req, res) {
    try {
      const attributes = await AttributeService.getAllAttributes();
      res.json(attributes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getAttributeByKey(req, res) {
    try {
      const attributes = await AttributeService.getAllAttributesByKey(
        req.params.key
      );
      res.json(attributes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateAttribute(req, res) {
    try {
      const updatedAttribute = await AttributeService.updateAttribute(
        req.params.key,
        req.params.value,
        req.body
      );
      if (!updatedAttribute) {
        return res.status(404).json({ message: "Attribute not found" });
      }
      res.json(updatedAttribute);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteAttribute(req, res) {
    try {
      const deletedAttribute = await AttributeService.deleteAttribute(
        req.params.key,
        req.params.value
      );
      if (!deletedAttribute) {
        return res.status(404).json({ message: "Attribute not found" });
      }
      res.json({ message: "Attribute deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
