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
const product_repository_1 = __importDefault(require("../product/product.repository"));
const utils_1 = require("../../core/utils");
const product_model_1 = __importDefault(require("./product.model"));
const category_1 = require("../category");
class ProductService {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_repository_1.default.findAll();
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
}
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map