"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class CategoryDTO {
    constructor(
    // _id?: Object,
    category_name, description, createdAt, updatedAt) {
        // this._id = _id; // Tạo ObjectId mới nếu không có _id
        this.category_name = category_name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.default = CategoryDTO;
__decorate([
    (0, class_validator_1.IsString)()
], CategoryDTO.prototype, "category_name", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], CategoryDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDate)()
], CategoryDTO.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)()
], CategoryDTO.prototype, "updatedAt", void 0);
//# sourceMappingURL=category.dto.js.map