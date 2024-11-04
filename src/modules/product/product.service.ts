import ProductRepository from "@modules/product/product.repository";
import ProductDto from "@modules/product/dtos/product.dto";
import { uploadImage } from "@core/utils";
import IProduct from "./product.interface";

class ProductService {
  async getAllProducts() {
    return await ProductRepository.findAll();
  }

  async getProductById(productId: string) {
    return await ProductRepository.findById(productId);
  }

  async createProduct(productData: ProductDto): Promise<IProduct | any> {
    // const image = uploadImage(productData.image as string);
    const image = productData.image;
    if (image) {
      try {
        const uploadedImage = await uploadImage(image, "product");

        productData.image = uploadedImage;
      } catch (error: any) {
        console.error("Lỗi khi tải lên hình ảnh:", error);
      }
    }
    return await ProductRepository.create(productData);
  }

  async createManyProducts(productDatas: ProductDto[]) {
    return await ProductRepository.createMany(productDatas);
  }

  async updateProduct(productId: string, productData: ProductDto) {
    return await ProductRepository.update(productId, productData);
  }

  async deleteProduct(productId: string) {
    return await ProductRepository.delete(productId);
  }
}

export default new ProductService();
