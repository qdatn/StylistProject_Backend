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
class ProductController {
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_service_1.default.getAllProducts();
                yield (0, middlewares_1.pagination)(req, res, products, next);
                res.status(200).json(res.locals.pagination);
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
                const products = req.body; // Dữ liệu sản phẩm gửi từ client
                return yield product_service_1.default.createProduct(Object.assign(Object.assign({}, products), { images: [] }));
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
                next(error);
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
                const image = req.file;
                const result = yield product_service_1.default.uploadImage(image, "product", "ABCTest");
                res.status(200).json({ imageUrl: result });
            }
            catch (error) {
                next(error.message);
            }
        });
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map