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
// const cloudinary = require("cloudinary").v2;
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
const uploadImage = (image, folder, product_folder_name) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const folderPath = `StylishEcommerce/${folder}/${product_folder_name}`;
        cloudinary_1.default.uploader
            .upload_stream({
            folder: folderPath,
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        })
            .end(image.buffer);
    });
});
exports.default = uploadImage;
// Cấu hình Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY,
// });
// const uploadImage = async (
//   filePath: string,
//   folder: string,
//   productFolder: string
// ) => {
//   try {
//     const folderPath = `StylishEcommerce/${folder}/${productFolder}`;
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: folderPath,
//     });
//     // // 1. Chuyển đổi URL blob thành đối tượng File
//     // const response = await fetch(filePath);
//     // const blob = await response.blob();
//     // const file = new File([blob], "image.png", { type: blob.type });
//     // // 2. Upload file lên Cloudinary
//     // const formData = new FormData();
//     // formData.append("file", file);
//     // // formData.append("upload_preset", "your_upload_preset"); // Nếu bạn có upload preset
//     // const uploadResponse = await fetch(`${folderPath}/${productFolder}`, {
//     //   method: "POST",
//     //   body: formData,
//     // });
//     // const result = await uploadResponse.json();
//     return result.secure_url;
//   } catch (error: any) {
//     throw new Error("Error uploading image: " + error.message);
//   }
// };
//# sourceMappingURL=uploadImage.js.map