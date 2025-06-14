"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer"); // dùng cho việc chuyển đổi kiểu
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender || (Gender = {}));
class UserInfoDto {
    constructor(_id, user, name, phone_number, gender, birthday, body_shape, height, weight, style_preferences, createAt, updateAt) {
        this._id = _id;
        this.user = user;
        this.name = name;
        this.phone_number = phone_number;
        this.gender = gender;
        this.birthday = birthday;
        this.body_shape = body_shape;
        this.height = height;
        this.weight = weight;
        this.style_preferences = style_preferences;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}
exports.default = UserInfoDto;
__decorate([
    (0, class_validator_1.IsMongoId)()
], UserInfoDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
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
__decorate([
    (0, class_validator_1.IsDate)()
], UserInfoDto.prototype, "createAt", void 0);
//# sourceMappingURL=getUserInfo.dto.js.map