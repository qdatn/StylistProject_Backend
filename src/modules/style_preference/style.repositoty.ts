import { IStylePreference } from "./style.interface";
import StylePreference from "./style.model";

class StylePreferenceRepository {
  async findAll() {
    return await StylePreference.find();
  }

  async findById(id: string) {
    return await StylePreference.findById(id);
  }

  async create(stylePreferenceData: IStylePreference) {
    return await StylePreference.create(stylePreferenceData);
  }

  async update(id: string, stylePreferenceData: IStylePreference) {
    return await StylePreference.findByIdAndUpdate(id, stylePreferenceData, {
      new: true,
    });
  }

  async delete(id: string) {
    return await StylePreference.findByIdAndDelete(id);
  }
}

export default new StylePreferenceRepository();
