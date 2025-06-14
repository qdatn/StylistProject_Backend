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
const middlewares_1 = require("../../core/middlewares");
const product_service_1 = __importDefault(require("../product/product.service"));
const product_model_1 = __importDefault(require("./product.model"));
class ProductController {
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const products = Array.isArray((_a = req.body) === null || _a === void 0 ? void 0 : _a.products) && req.body.products.length > 0
                    ? req.body.products
                    : yield product_service_1.default.getAllProducts();
                // const products = await ProductService.getAllProducts();
                yield (0, middlewares_1.pagination)(req, res, products, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllProductsByField(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lấy các tham số từ query string
                const { field, value } = req.query;
                const query = {};
                if (field && value) {
                    const fieldStr = String(field);
                    const valueStr = String(value);
                    // Tạo query object động
                    // query[fieldStr] = { $regex: valueStr.toString(), $options: "i" }; // Tìm kiếm không phân biệt hoa thường
                    if (["true", "false"].includes(valueStr.toLowerCase())) {
                        query[fieldStr] = valueStr.toLowerCase() === "true";
                    }
                    else if (!isNaN(Number(valueStr))) {
                        query[fieldStr] = Number(valueStr);
                    }
                    else {
                        query[fieldStr] = { $regex: valueStr, $options: "i" };
                    }
                }
                // Lấy sản phẩm từ service
                const products = yield product_service_1.default.getProductsByField(query);
                // Phân trang và trả kết quả
                yield (0, middlewares_1.pagination)(req, res, products, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Fetch product by product id list
    fetchAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productIds = req.body.productIds;
            if (!productIds || !Array.isArray(productIds)) {
                res
                    .status(400)
                    .json({ message: "Missing or invalid productIds in request body" });
                return;
            }
            // Truy vấn DB lấy sản phẩm theo ID
            const products = yield product_model_1.default.find({ _id: { $in: productIds } }).lean();
            // Bảo toàn thứ tự ID từ client
            const productMap = new Map(products.map((p) => [String(p._id), p]));
            const orderedProducts = productIds
                .map((id) => productMap.get(String(id)))
                .filter(Boolean);
            // Gọi hàm phân trang
            yield (0, middlewares_1.pagination)(req, res, orderedProducts, next);
            res.status(200).json(res.locals.pagination);
        });
    }
    getAllProductsByStyle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const sortedProductIds = yield product_service_1.default.getRecommendedProductsForUser(userId);
                // // Lấy toàn bộ sản phẩm theo các ID đó
                // const products = await Product.find({
                //   _id: { $in: sortedProductIds },
                // }).lean();
                // // Map lại sản phẩm theo thứ tự đã gợi ý
                // const productMap = new Map(products.map((p) => [String(p._id), p]));
                // const orderedProducts = sortedProductIds
                //   .map((id) => productMap.get(String(id)))
                //   .filter(Boolean);
                // Phân trang
                // await pagination(req, res, orderedProducts, next);
                // res.status(200).json(res.locals.pagination);
                // res.status(200).json(orderedProducts);
                res.status(200).json(sortedProductIds);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.default.getProductById(req.params.id);
                if (!product) {
                    res.status(404).json({ message: "Product not found" });
                }
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const product = await ProductService.createProduct(req.body);
                // res.status(201).json(product);
                const products_req = req.body; // Dữ liệu sản phẩm gửi từ client
                const productData = yield product_service_1.default.createProduct(Object.assign(Object.assign({}, products_req), { images: [] }));
                const product = yield product_service_1.default.createProduct(productData);
                // Nếu có ảnh, upload từng ảnh
                if (req.body.images && req.body.images.length > 0) {
                    const uploadPromises = req.body.images.map((image) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            return yield product_service_1.default.uploadImage(image, "product", product._id);
                        }
                        catch (error) {
                            console.error(`Error uploading image: ${image}`, error);
                            return null;
                        }
                    }));
                    const uploadedImages = (yield Promise.all(uploadPromises)).filter((url) => url !== null);
                    // Cập nhật sản phẩm với danh sách ảnh đã upload
                    const updatedProduct = yield product_service_1.default.updateProduct(product._id, Object.assign(Object.assign({}, productData), { images: uploadedImages }));
                    res.status(201).json(updatedProduct);
                }
                else {
                    res.status(201).json(product);
                }
                // //Upload image to cloudinary
                // const images: any = await Promise.all(
                //   products.images.map(async (image: string) => {
                //     const uploadImage: any = await ProductService.uploadImage(
                //       image,
                //       "product",
                //       // addProduct._id
                //       "ABCTest"
                //     );
                //     return uploadImage.secure_url;
                //   })
                // );
                // const newProducts = await ProductService.updateProduct(addProduct._id, {
                //   ...addProduct,
                //   images: images,
                // });
                // res.status(201).json({
                //   message: "Products added successfully",
                //   addPriduct: addProduct,
                //   newProduct: newProducts,
                //   images: images,
                // });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    createManyProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = req.body; // Dữ liệu sản phẩm gửi từ client
                const newProducts = yield product_service_1.default.createManyProducts(products);
                res
                    .status(201)
                    .json({ message: "Products added successfully", data: newProducts });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.default.updateProduct(req.params.id, req.body);
                if (!product) {
                    res.status(404).json({ message: "Product not found" });
                }
                else {
                    res.status(200).json(product);
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.default.deleteProduct(req.params.id);
                if (!product) {
                    res.status(404).json({ message: "Product not found" });
                }
                else {
                    res.status(200).json({ message: "Product deleted" });
                }
                // res.status(204).send();
            }
            catch (error) {
                if (error.status === 409) {
                    res.status(409).json({
                        message: "Product is used in an order item and cannot be deleted.",
                    });
                }
                else {
                    next(error);
                }
            }
        });
    }
    searchProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.query.name; // Lấy từ query string
                if (!name) {
                    res.status(400).json({ message: "Name query parameter is required" });
                    return;
                }
                const products = yield product_service_1.default.searchProductsByName(name);
                yield (0, middlewares_1.pagination)(req, res, products, next);
                res.status(200).json(res.locals.pagination);
                // res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getFilteredProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { name, category, sortBy, sortOrder } = req.query;
                const name = req.query.name;
                const category = req.query.category;
                const sortBy = req.query.sortBy;
                const sortOrder = req.query.sortOrder;
                const products = yield product_service_1.default.filterProducts(name, category, sortBy, sortOrder);
                yield (0, middlewares_1.pagination)(req, res, products, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const image: any = req.file;
                const files = req.files;
                const { id } = req.params;
                // const result = await ProductService.uploadImage(image, "product", id);
                const uploadPromises = files.map((file) => product_service_1.default.uploadImage(file, "product", id));
                const results = yield Promise.all(uploadPromises);
                const imageUrls = results.map((result) => result);
                // Cập nhật sản phẩm với ảnh mới
                yield product_model_1.default.findByIdAndUpdate(id, {
                    $push: { images: { $each: imageUrls } },
                });
                res.status(200).json({ imageUrls: imageUrls });
            }
            catch (error) {
                next(error.message);
            }
        });
    }
    deleteImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { imageUrl } = req.body;
                const { id } = req.params;
                const result = yield product_service_1.default.deleteImage(imageUrl, "product", id);
                if (result.result === "ok") {
                    res.status(200).json({ message: `Delete success image ${imageUrl}` });
                }
                else {
                    next({ message: `Delete fail image ${imageUrl}` });
                }
                // ({ imageUrl: result });
            }
            catch (error) {
                next(error.message);
            }
        });
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map