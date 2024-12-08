"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer"); // dùng cho việc chuyển đổi kiểu
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender || (Gender = {}));
class UserInfoDto {
    constructor(data) {
        this.user = data.user;
        this.name = data.name;
        this.phone_number = data.phone_number;
        this.gender = data.gender;
        this.birthday = data.birthday;
        this.body_shape = data.body_shape;
        this.height = data.height;
        this.weight = data.weight;
        this.style_preferences = data.style_preferences;
    }
}
exports.default = UserInfoDto;
__decorate([
    (0, class_validator_1.IsMongoId)()
], UserInfoDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserInfoDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], UserInfoDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Gender)
], UserInfoDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date) // để đảm bảo biến được chuyển đổi thành kiểu Date
], UserInfoDto.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], UserInfoDto.prototype, "body_shape", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)()
], UserInfoDto.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)()
], UserInfoDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }) // kiểm tra từng phần tử trong mảng
], UserInfoDto.prototype, "style_preferences", void 0);
//# sourceMappingURL=userInfo.dto.js.map