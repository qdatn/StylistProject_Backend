"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const product_repository_1 = __importDefault(require("../product/product.repository"));
const utils_1 = require("../../core/utils");
const product_model_1 = __importDefault(require("./product.model"));
const category_1 = require("../category");
const userInfo_1 = require("../userInfo");
const geminiApi_1 = require("../../core/utils/geminiApi");
const XLSX = __importStar(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const attribute_1 = require("../attribute");
class ProductService {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_repository_1.default.findAll();
        });
    }
    getProductsByField(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_repository_1.default.findByFilter(query);
        });
    }
    getAllProductActive() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_repository_1.default.findAllProductActive();
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_repository_1.default.findById(productId);
        });
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create product without image
            return yield product_repository_1.default.create(productData);
        });
    }
    createManyProducts(productDatas) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_repository_1.default.createMany(productDatas);
        });
    }
    updateProduct(productId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            // productData._id = new mongoose.Types.ObjectId(productData._id as string);
            // productData.categories = productData.categories!.map((categoryId) => {
            //   return new mongoose.Types.ObjectId(categoryId as string);
            // });
            // const images = Array.isArray(productData.images) ? productData.images : [];
            // if (images && images.length > 0) {
            //   // Duyệt mảng và tải lên từng ảnh đồng thời
            //   const uploadedImages: any = await Promise.all(
            //     images.map((image) => {
            //       if (
            //         typeof image === "string" &&
            //         !image.includes("res.cloudinary.com")
            //       ) {
            //         uploadImage(
            //           image,
            //           `product`,
            //           `${productData.product_name}_${getFolderFromUrl(image)}`
            //         );
            //       } else {
            //         return image;
            //       }
            //     })
            //   );
            //   // Lưu mảng URL ảnh đã tải lên vào `productData.images`
            //   productData.images = uploadedImages;
            // }
            return yield product_repository_1.default.update(productId, productData);
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_repository_1.default.delete(productId);
        });
    }
    searchProductsByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_repository_1.default.findByName(name);
        });
    }
    filterProducts() {
        return __awaiter(this, arguments, void 0, function* (name = "", category = "", sortBy = "product_name", sortOrder = "asc") {
            const filter = {};
            // Tìm kiếm theo tên sản phẩm
            if (name) {
                filter.product_name = { $regex: name, $options: "i" }; // Case-insensitive search
            }
            // Lọc theo tên danh mục
            if (category) {
                const categoryNames = category.split(",").map((name) => name.trim());
                const categories = yield category_1.Category.find(categoryNames[0] == "All"
                    ? {}
                    : {
                        category_name: {
                            $in: categoryNames.map((name) => new RegExp(name, "i")),
                        },
                    });
                if (categories.length === 0) {
                    throw new Error(`No categories found for names: ${categoryNames.join(", ")}`);
                }
                filter.categories = { $in: categories.map((cat) => cat._id) };
            }
            // Sắp xếp kết quả
            const sortOptions = {};
            sortOptions[sortBy] = sortOrder.toLowerCase() === "desc" ? -1 : 1;
            // Thực hiện tìm kiếm, lọc và sắp xếp
            return yield product_model_1.default.find(filter).populate("categories").sort(sortOptions);
        });
    }
    uploadImage(image, folder, product_folder_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, utils_1.uploadImage)(image, folder, product_folder_name);
            return result.secure_url;
        });
    }
    deleteImage(imageUrl, folder, product_folder_name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.deleteImage)(imageUrl, folder, product_folder_name);
        });
    }
    getRecommendedProductsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Get UserInfo & StylePreference
            const userInfo = yield userInfo_1.UserInfo.findOne({ user: userId }).populate("style_preferences");
            if (!userInfo || !userInfo.style_preferences) {
                throw new Error("User info or style preferences not found");
            }
            const stylePreferences = userInfo.style_preferences;
            // 2. Get all products
            const products = yield product_model_1.default.find({ status: true }).lean();
            // 3. Generate prompt for Gemini
            const prompt = `
  Based on the following fashion style preferences of the user:
  
  ${JSON.stringify(stylePreferences, null, 2)}
  
  Please evaluate how well each product matches the user's preferences on a scale from 0 to 10, where a higher score indicates a better match.
  
  Return a list of products sorted by relevance score in descending order, in the following JSON format:
  [
    {
      product_id: "...",
      score: 9.5
    },
    ...
  ]
  
  Here is the list of products:
  ${JSON.stringify(products, null, 2)}
  `;
            // 4. Gửi đến Gemini API để đánh giá độ phù hợp
            const recommended = yield (0, geminiApi_1.getGeminiRecommendation)(prompt);
            // 5. Parse kết quả và sắp xếp sản phẩm theo điểm
            const scoresMap = new Map();
            recommended.forEach((item) => {
                scoresMap.set(item.product_id, item.score);
            });
            const sortedProducts = products.sort((a, b) => {
                const scoreA = scoresMap.get(String(a._id)) || 0;
                const scoreB = scoresMap.get(String(b._id)) || 0;
                return scoreB - scoreA;
            });
            const sortedProductIds = sortedProducts.map((item) => item._id);
            return sortedProductIds;
        });
    }
    importFromExcel(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            // Lấy tất cả attribute hiện có
            const attributeDocs = yield attribute_1.AttributeService.getAllAttributes();
            const attributeMap = new Map();
            attributeDocs.forEach((attr) => attributeMap.set(attr.key, attr.value));
            // Lấy tất cả category hiện có
            const allCategories = yield category_1.CategoryService.getAllCategories();
            const categoryNameToId = new Map();
            allCategories.forEach((cat) => categoryNameToId.set(cat.category_name, cat._id.toString()));
            const groupedProducts = new Map();
            const failedRows = [];
            for (const raw of data) {
                const row = raw;
                const { product_name, description, brand, status, price, stock_quantity, min_quantity, sold_quantity, stock_update_date, attributes, images, categories, } = row;
                if (!product_name || price == null || stock_quantity == null) {
                    failedRows.push(Object.assign(Object.assign({}, row), { error: "Missing required fields" }));
                    continue;
                }
                const imageList = typeof images === "string"
                    ? images.split(",").map((img) => img.trim())
                    : [];
                // Parse categories (và thêm nếu chưa có)
                const categoryNames = typeof categories === "string"
                    ? categories.split(",").map((c) => c.trim())
                    : [];
                const categoryList = [];
                for (const name of categoryNames) {
                    let id = categoryNameToId.get(name);
                    if (!id) {
                        // Tạo category mới
                        const newCategory = yield category_1.CategoryService.createCategory({
                            category_name: name,
                            description: "",
                        });
                        id = newCategory._id.toString();
                        categoryNameToId.set(name, id);
                    }
                    categoryList.push(id);
                }
                // Parse attributes (và thêm nếu chưa có)
                let attributeList = [];
                if (attributes) {
                    const pairs = attributes.split(";");
                    for (const pair of pairs) {
                        const [keyRaw, valueRaw] = pair.split("=");
                        const key = keyRaw === null || keyRaw === void 0 ? void 0 : keyRaw.trim();
                        const value = valueRaw === null || valueRaw === void 0 ? void 0 : valueRaw.trim();
                        if (!key || !value)
                            continue;
                        if (!attributeMap.has(key)) {
                            // Tạo mới attribute
                            yield attribute_1.AttributeService.createAttribute({ key, value: [value] });
                            attributeMap.set(key, [value]);
                        }
                        else {
                            const values = attributeMap.get(key);
                            if (!values.includes(value)) {
                                // Thêm value mới vào DB
                                yield attribute_1.AttributeService.addNewValue(key, value);
                                values.push(value);
                                attributeMap.set(key, values);
                            }
                        }
                        attributeList.push({ key, value });
                    }
                }
                if (attributeList.length === 0) {
                    failedRows.push(Object.assign(Object.assign({}, row), { error: "Invalid or empty attributes" }));
                    continue;
                }
                const variant = {
                    attributes: attributeList,
                    price: Number(price),
                    stock_quantity: Number(stock_quantity),
                    min_quantity: Number(min_quantity !== null && min_quantity !== void 0 ? min_quantity : 0),
                    sold_quantity: Number(sold_quantity !== null && sold_quantity !== void 0 ? sold_quantity : 0),
                    stock_update_date: stock_update_date
                        ? new Date(stock_update_date)
                        : new Date(),
                };
                if (groupedProducts.has(product_name)) {
                    groupedProducts.get(product_name).variants.push(variant);
                }
                else {
                    groupedProducts.set(product_name, {
                        baseInfo: {
                            product_name,
                            description: description !== null && description !== void 0 ? description : "No description provided",
                            brand: brand !== null && brand !== void 0 ? brand : "No brand provided",
                            status: status === "true" || status === true,
                            images: imageList,
                            categories: categoryList,
                        },
                        variants: [variant],
                    });
                }
            }
            const validProducts = Array.from(groupedProducts.values()).map((p) => (Object.assign(Object.assign({}, p.baseInfo), { variants: p.variants })));
            const inserted = yield product_repository_1.default.createMany(validProducts);
            fs_1.default.unlinkSync(filePath);
            return {
                insertedCount: inserted.length,
                failedRows,
            };
        });
    }
}
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map