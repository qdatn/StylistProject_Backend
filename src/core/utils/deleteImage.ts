import cloudinary from "@core/configs/cloudinary";

const deleteImage = async (
  imageUrl: string,
  folder: string,
  product_folder_name: string
) => {
  try {
    const publicId = imageUrl.split("/").pop()?.split(".")[0] || "";
    console.log(publicId);
    const result = await cloudinary.uploader.destroy(
      `StylishEcommerce/${folder}/${product_folder_name}/${publicId}`,
      {
        invalidate: true,
        resource_type: "image",
      }
    );
    // const result = await cloudinary.api.delete_resources([publicId], {
    //   type: "upload",
    //   resource_type: "image",
    // });
    return result;
  } catch (error) {
    console.error("Lỗi khi xóa ảnh:", error);
  }
};

export default deleteImage;
