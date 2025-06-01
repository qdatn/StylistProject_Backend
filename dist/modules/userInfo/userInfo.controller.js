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
// controllers/userInfoController.js
const middlewares_1 = require("../../core/middlewares");
const utils_1 = require("../../core/utils");
const userInfo_service_1 = __importDefault(require("../userInfo/userInfo.service"));
class UserInfoController {
    getAllUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfos = yield userInfo_service_1.default.getAllUserInfos();
                yield (0, middlewares_1.pagination)(req, res, userInfos, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getUserInfoById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = yield userInfo_service_1.default.getUserInfoById(req.params.id);
                if (!userInfo) {
                    res.status(404).json({ message: "UserInfo not found" });
                }
                else {
                    res.status(200).json(userInfo);
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    createUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = yield userInfo_service_1.default.createUserInfo(req.body);
                res.status(201).json(userInfo);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUserInfo = yield userInfo_service_1.default.updateUserInfo(req.params.id, req.body);
                if (!updatedUserInfo) {
                    res.status(404).json({ message: "UserInfo not found" });
                }
                else {
                    res.status(200).json(updatedUserInfo);
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUserInfo = yield userInfo_service_1.default.deleteUserInfo(req.params.id);
                if (!deletedUserInfo) {
                    res.status(404).json({ message: "UserInfo not found" });
                }
                else {
                    res.status(200).json({ message: "UserInfo deleted" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    uploadBodyShapeImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    next({ error: "No image file provided" });
                }
                const file = req.file;
                const result = yield (0, utils_1.uploadImage)(file, "body_shape", "images");
                res.json({ imageUrl: result.secure_url });
            }
            catch (error) {
                console.error(error);
                next({ error: "Upload failed" });
            }
        });
    }
}
exports.default = new UserInfoController();
//# sourceMappingURL=userInfo.controller.js.map