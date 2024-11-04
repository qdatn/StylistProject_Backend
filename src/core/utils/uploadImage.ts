const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadImage = async (filePath: string, folder: string) => {
  try {
    const folderPath = `StylishEcommerce/${folder}`;
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderPath,
    });
    return result.secure_url;
  } catch (error: any) {
    throw new Error("Error uploading image: " + error.message);
  }
};

export default uploadImage;
