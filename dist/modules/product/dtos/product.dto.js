"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantDTO = void 0;
const class_validator_1 = require("class-validator");
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
class AttributeDTO {
}
__decorate([
    (0, class_validator_1.IsString)()
], AttributeDTO.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], AttributeDTO.prototype, "value", void 0);
class ProductVariantDTO {
}
exports.ProductVariantDTO = ProductVariantDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => AttributeDTO)
], ProductVariantDTO.prototype, "attributes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductVariantDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductVariantDTO.prototype, "stock_quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], ProductVariantDTO.prototype, "min_quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)()
], ProductVariantDTO.prototype, "sold_quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date)
], ProductVariantDTO.prototype, "stock_update_date", void 0);
class ProductDto {
    constructor(_id, product_name, description, brand, categories, status, images, variants, createdAt, updatedAt) {
        this._id = _id;
        this.product_name = product_name;
        this.description = description;
        this.brand = brand;
        this.categories = categories;
        this.status = status;
        this.images = images;
        this.variants = variants;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.default = ProductDto;
__decorate([
    (0, class_validator_1.IsMongoId)()
], ProductDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ProductDto.prototype, "product_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], ProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], ProductDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)()
], ProductDto.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)()
], ProductDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], ProductDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsArray)()
    // attributes?: Object[];
], ProductDto.prototype, "variants", void 0);
__decorate([
    (0, class_validator_1.IsDate)()
], ProductDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)()
], ProductDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=product.dto.js.map