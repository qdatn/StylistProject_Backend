import multer, { memoryStorage } from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "StylishEcommerce", // Specify the folder where images will be uploaded
//     allowed_formats: ["jpg", "png", "jpeg"], // Allowed file types
//   },
// });
const storage = memoryStorage();
const upload = multer({ storage });

export default upload;
