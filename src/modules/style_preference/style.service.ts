import { IStylePreference } from "./style.interface";
import StylePreferenceRepository from "./style.repositoty";

class StylePreferenceService {
  async create(data: IStylePreference) {
    return StylePreferenceRepository.create(data);
  }

  async getAll() {
    return StylePreferenceRepository.findAll();
  }

  async getById(id: string) {
    return StylePreferenceRepository.findById(id);
  }

  async update(id: string, data: IStylePreference) {
    return StylePreferenceRepository.update(id, data);
  }

  async delete(id: string) {
    return StylePreferenceRepository.delete(id);
  }
}

export default new StylePreferenceService();