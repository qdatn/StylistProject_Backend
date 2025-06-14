"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const style_repositoty_1 = __importDefault(require("./style.repositoty"));
class StylePreferenceService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return style_repositoty_1.default.create(data);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return style_repositoty_1.default.findAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return style_repositoty_1.default.findById(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return style_repositoty_1.default.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return style_repositoty_1.default.delete(id);
        });
    }
    getAnalytics() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPreferences = yield style_repositoty_1.default.findAll();
            // Phân tích dữ liệu
            const analyticsData = this.analyzeData(allPreferences);
            return analyticsData;
        });
    }
    analyzeData(preferences) {
        // 1. Top styles
        const styleCounts = {};
        preferences.forEach((pref) => {
            var _a;
            (_a = pref.favoriteStyles) === null || _a === void 0 ? void 0 : _a.forEach((style) => {
                styleCounts[style] = (styleCounts[style] || 0) + 1;
            });
        });
        const topStyles = Object.entries(styleCounts)
            .map(([item, count]) => ({ item, count }))
            .sort((a, b) => b.count - a.count);
        // 2. Popular colors
        const colorCounts = {};
        preferences.forEach((pref) => {
            var _a;
            (_a = pref.favoriteColors) === null || _a === void 0 ? void 0 : _a.forEach((color) => {
                colorCounts[color] = (colorCounts[color] || 0) + 1;
            });
        });
        const popularColors = Object.entries(colorCounts)
            .map(([item, count]) => ({ item, count }))
            .sort((a, b) => b.count - a.count);
        // 3. Size distribution
        const sizeDistribution = {
            top: {},
            bottom: {},
            shoe: {},
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
        const placeCounts = {};
        const frequencyCounts = {};
        preferences.forEach((pref) => {
            var _a;
            (_a = pref.shoppingPlaces) === null || _a === void 0 ? void 0 : _a.forEach((place) => {
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
        const trendFollowing = {};
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
exports.default = new StylePreferenceService();
//# sourceMappingURL=style.service.js.map