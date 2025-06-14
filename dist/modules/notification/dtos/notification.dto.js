"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class NotificationDto {
    constructor(user, type, title, priority, content, status, order) {
        this.user = user;
        this.type = type;
        this.title = title;
        this.priority = priority;
        this.content = content;
        this.status = status;
        this.order = order;
    }
}
exports.default = NotificationDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)()
], NotificationDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], NotificationDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], NotificationDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], NotificationDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], NotificationDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], NotificationDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsObject)()
], NotificationDto.prototype, "order", void 0);
//# sourceMappingURL=notification.dto.js.map