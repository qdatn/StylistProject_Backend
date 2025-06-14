"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class OrderItemDTO {
    constructor(order, product, quantity, attributes, note) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.attributes = attributes;
        this.note = note;
    }
}
exports.default = OrderItemDTO;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)()
], OrderItemDTO.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)()
], OrderItemDTO.prototype, "product", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: "Quantity must be at least 1" })
], OrderItemDTO.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsArray)()
], OrderItemDTO.prototype, "attributes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], OrderItemDTO.prototype, "note", void 0);
//# sourceMappingURL=orderItem.dto.js.map