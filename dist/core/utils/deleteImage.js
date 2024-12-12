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
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
const deleteImage = (imageUrl, folder, product_folder_name) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const publicId = ((_a = imageUrl.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0]) || "";
        console.log(publicId);
        const result = yield cloudinary_1.default.uploader.destroy(`StylishEcommerce/${folder}/${product_folder_name}/${publicId}`, {
            invalidate: true,
            resource_type: "image",
        });
        // const result = await cloudinary.api.delete_resources([publicId], {
        //   type: "upload",
        //   resource_type: "image",
        // });
        return result;
    }
    catch (error) {
        console.error("Lỗi khi xóa ảnh:", error);
    }
});
exports.default = deleteImage;
//# sourceMappingURL=deleteImage.js.map