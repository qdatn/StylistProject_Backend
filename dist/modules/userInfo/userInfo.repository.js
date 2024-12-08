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
// repositories/userInfoRepository.js
const userInfo_model_1 = __importDefault(require("../userInfo/userInfo.model"));
class UserInfoRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userInfo_model_1.default.find().populate("user");
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userInfo_model_1.default.findOne({ user: id }).populate("user");
        });
    }
    create(userInfoData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userInfo_model_1.default.create(userInfoData);
        });
    }
    update(id, userInfoData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userInfo_model_1.default.findOneAndUpdate({ user: id }, userInfoData, {
                new: true,
            }).populate("user");
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userInfo_model_1.default.deleteOne({ user: id });
        });
    }
}
exports.default = new UserInfoRepository();
//# sourceMappingURL=userInfo.repository.js.map