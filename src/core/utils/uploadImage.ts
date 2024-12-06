// const cloudinary = require("cloudinary").v2;
import cloudinary from "@core/configs/cloudinary";

const uploadImage = async (
  image: Express.Multer.File,
  folder: string,
  product_folder_name: string
) => {
  return new Promise((resolve, reject) => {
    const folderPath = `StylishEcommerce/${folder}/${product_folder_name}`;
    cloudinary.uploader
      .upload_stream(
        {
          folder: folderPath,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(image.buffer);
  });
};

export default uploadImage;
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
