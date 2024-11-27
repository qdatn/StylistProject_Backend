import ProductRepository from "@modules/product/product.repository";
import ProductDto from "@modules/product/dtos/product.dto";
import { uploadImage } from "@core/utils";
import IProduct from "./product.interface";
import mongoose from "mongoose";
import getFolderFromUrl from "@core/utils/getFolderFromUrl";
class ProductService {
  async getAllProducts() {
    return await ProductRepository.findAll();
  }

  async getProductById(productId: string) {
    return await ProductRepository.findById(productId);
  }

  async createProduct(productData: ProductDto): Promise<IProduct | any> {
    // const image = uploadImage(productData.image as string);
    const images = Array.isArray(productData.images) ? productData.images : [];

    if (images && images.length > 0) {
      try {
        // Duyệt mảng và tải lên từng ảnh đồng thời
        const uploadedImages = await Promise.all(
          images.map((image) =>
            uploadImage(
              image,
              `product`,
              `${productData.product_name}_${Date.now()}`
            )
          )
        );

        // Lưu mảng URL ảnh đã tải lên vào `productData.images`
        productData.images = uploadedImages;
      } catch (error: any) {
        console.error("Lỗi khi tải lên hình ảnh:", error);
      }
    }

    // if (image) {
    //   try {
    //     const uploadedImage = await uploadImage(
    //       image,
    //       `product/${productData.product_name}`
    //     );

    //     productData.image = uploadedImage;
    //   } catch (error: any) {
    //     console.error("Lỗi khi tải lên hình ảnh:", error);
    //   }
    // }
    return await ProductRepository.create(productData);
  }

  async createManyProducts(productDatas: ProductDto[]) {
    return await ProductRepository.createMany(productDatas);
  }

  async updateProduct(productId: string, productData: ProductDto) {
    productData._id = new mongoose.Types.ObjectId(productData._id as string);
    productData.categories = productData.categories!.map((categoryId) => {
      return new mongoose.Types.ObjectId(categoryId as string);
    });

    const images = Array.isArray(productData.images) ? productData.images : [];

    if (images && images.length > 0) {
      // Duyệt mảng và tải lên từng ảnh đồng thời
      const uploadedImages: any = await Promise.all(
        images.map((image) => {
          if (!image.includes("res.cloudinary.com")) {
            uploadImage(
              image,
              `product`,
              `${productData.product_name}_${getFolderFromUrl(image)}`
            );
          } else {
            return image;
          }
        })
      );

      // Lưu mảng URL ảnh đã tải lên vào `productData.images`
      productData.images = uploadedImages;
    }

    return await ProductRepository.update(productId, productData);
  }

  async deleteProduct(productId: string) {
    return await ProductRepository.delete(productId);
  }

  async searchProductsByName(name: string) {
    return await ProductRepository.findByName(name);
  }

  async filterProducts(filters: any) {
    const query: any = {};

    // filter by name
    if (filters.product_name) {
      query.product_name = { $regex: filters.product_name, $options: "i" };
    }

    // filter
    if (filters.price_min || filters.price_max) {
      query.price = {};
      if (filters.price_min) query.price.$gte = filters.price_min;
      if (filters.price_max) query.price.$lte = filters.price_max;
    }

    if (filters.brand) {
      query.brand = filters.brand;
    }

    if (filters.status !== undefined) {
      query.status = filters.status;
    }

    if (filters.categories) {
      query.categories = { $in: filters.categories };
    }

    if (filters.attributes) {
      query.attributes = {
        $elemMatch: {
          key: filters.attributes.key,
          value: { $in: filters.attributes.values },
        },
      };
    }
    return await ProductRepository.findByFilter(query);
  }
}

export default new ProductService();
