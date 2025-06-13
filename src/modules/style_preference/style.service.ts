import AnalyticsDataDto from "./dtos/analyticsData.dto";
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

  async getAnalytics() {
    const allPreferences = await StylePreferenceRepository.findAll();

    // Phân tích dữ liệu
    const analyticsData = this.analyzeData(allPreferences as IStylePreference[]);

    return analyticsData;
  }

  private analyzeData(preferences: IStylePreference[]): AnalyticsDataDto {
    // 1. Top styles
    const styleCounts: Record<string, number> = {};
    preferences.forEach((pref) => {
      pref.favoriteStyles?.forEach((style) => {
        styleCounts[style] = (styleCounts[style] || 0) + 1;
      });
    });
    const topStyles = Object.entries(styleCounts)
      .map(([item, count]) => ({ item, count }))
      .sort((a, b) => b.count - a.count);

    // 2. Popular colors
    const colorCounts: Record<string, number> = {};
    preferences.forEach((pref) => {
      pref.favoriteColors?.forEach((color) => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      });
    });
    const popularColors = Object.entries(colorCounts)
      .map(([item, count]) => ({ item, count }))
      .sort((a, b) => b.count - a.count);

    // 3. Size distribution
    const sizeDistribution = {
      top: {} as Record<string, number>,
      bottom: {} as Record<string, number>,
      shoe: {} as Record<string, number>,
    };
    preferences.forEach((pref) => {
      if (pref.topSize) {
        sizeDistribution.top[pref.topSize] =
          (sizeDistribution.top[pref.topSize] || 0) + 1;
      }
      if (pref.bottomSize) {
        sizeDistribution.bottom[pref.bottomSize] =
          (sizeDistribution.bottom[pref.bottomSize] || 0) + 1;
      }
      if (pref.shoeSize) {
        sizeDistribution.shoe[pref.shoeSize] =
          (sizeDistribution.shoe[pref.shoeSize] || 0) + 1;
      }
    });

    // 4. Shopping habits
    const placeCounts: Record<string, number> = {};
    const frequencyCounts: Record<string, number> = {};
    preferences.forEach((pref) => {
      pref.shoppingPlaces?.forEach((place) => {
        placeCounts[place] = (placeCounts[place] || 0) + 1;
      });
      if (pref.shoppingFrequency) {
        frequencyCounts[pref.shoppingFrequency] =
          (frequencyCounts[pref.shoppingFrequency] || 0) + 1;
      }
    });
    const shoppingPlaces = Object.entries(placeCounts)
      .map(([item, count]) => ({ item, count }))
      .sort((a, b) => b.count - a.count);

    // 5. Trend following
    const trendFollowing: Record<string, number> = {};
    preferences.forEach((pref) => {
      if (pref.followTrends) {
        trendFollowing[pref.followTrends] =
          (trendFollowing[pref.followTrends] || 0) + 1;
      }
    });

    // 6. Brand preferences (giả lập)
    const brandPreferences = [
      { brand: "Zara", count: 78 },
      { brand: "H&M", count: 65 },
      { brand: "Nike", count: 52 },
      { brand: "Uniqlo", count: 48 },
      { brand: "Adidas", count: 42 },
    ];

    return {
      topStyles,
      popularColors,
      sizeDistribution,
      shoppingHabits: {
        places: shoppingPlaces,
        frequencies: frequencyCounts,
      },
      trendFollowing,
      brandPreferences,
      totalUsers: preferences.length,
      lastUpdated: new Date().toISOString(),
    };
  }
}

export default new StylePreferenceService();
