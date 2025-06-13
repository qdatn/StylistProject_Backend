import { Product, ProductDto, ProductService } from "@modules/product";
import { ChatModel } from ".";
import Message, { IMessage } from "./chat.model";
import { askGeminiAboutProduct } from "./gemini.service";
import mongoose from "mongoose";
import { UserInfo, UserInfoService } from "@modules/userInfo";

class ChatService {
  public async saveMessage(
    sender: string,
    receiver: string,
    content: string
  ): Promise<IMessage> {
    const message = new Message({ sender, receiver, content });
    return await message.save();
  }

  public async getMessagesBetweenUsers(
    user1Id: string,
    user2Id: string
  ): Promise<IMessage[]> {
    const groupId = [user1Id, user2Id].sort().join("_");
    const messages = await Message.find({ groupId }).sort({ timestamp: 1 });
    return messages;
  }

  public async getMessageById(id: string): Promise<IMessage | null> {
    return await Message.findById(id);
  }

  public async getMessagesByUserId(userId: string): Promise<IMessage[]> {
    return await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ timestamp: -1 });
  }

  public async deleteMessage(id: string): Promise<boolean> {
    const deleted = await Message.findByIdAndDelete(id);
    return !!deleted;
  }

  /*------------- CHAT BOT HERE --------------- */

  public async generateProductAnswer(
    productId: string,
    userId: string,
    question: string
  ) {
    const questionType = this.classifyQuestion(question);

    // 1. Xử lý câu hỏi không cần sản phẩm
    if (questionType === "GENERAL") {
      return await askGeminiAboutProduct(question);
    }

    // 2. Xử lý câu hỏi về STYLE (ưu tiên xử lý trước PRODUCT)
    if (questionType === "STYLE") {
      const userinfo = await UserInfoService.getUserInfoById(userId);

      // Xử lý khi có productId
      if (productId) {
        const product = await ProductService.getProductById(productId);
        return product
          ? await askGeminiAboutProduct(question, product, userinfo)
          : await askGeminiAboutProduct(question, null, userinfo);
      }

      // Xử lý khi không có productId nhưng cần thông tin style
      return userinfo
        ? await askGeminiAboutProduct(question, null, userinfo)
        : "Please tell me about your style preferences first so I can help you better.";
    }

    // 3. Xử lý câu hỏi cần sản phẩm nhưng không có productId
    if (!productId) {
      return "Please specify a product first so I can help you better.";
    }

    const product = await ProductService.getProductById(productId);
    if (!product) {
      return "Sorry, I couldn't find that product. Please check the product ID.";
    }

    // 1. Extract keywords from the question
    const keywords = this.extractKeywords(question.toLowerCase());
    const plainProduct: ProductDto = product.toObject();

    // 2. Check if keywords match product model fields
    const directAnswer = this.tryDirectAnswer(keywords, plainProduct, question);

    if (directAnswer) {
      return directAnswer;
    }

    // 3. If no direct match, use Gemini
    return product
      ? await askGeminiAboutProduct(question, product)
      : await askGeminiAboutProduct(question);
  }

  private extractKeywords(question: string): string[] {
    // Simple keyword extraction - can be enhanced with NLP
    const commonWords = new Set([
      "what",
      "is",
      "the",
      "of",
      "this",
      "product",
      "a",
      "an",
      "how",
      "much",
      "many",
      "does",
      "do",
      "are",
      "can",
    ]);

    return question
      .split(/[\s,.?]+/)
      .filter((word) => word.length > 2 && !commonWords.has(word));
  }

  private tryDirectAnswer(
    keywords: string[],
    product: ProductDto,
    originalQuestion: string
  ): string | null {
    const fieldMapping: Record<string, keyof ProductDto | string> = {
      price: "variants",
      cost: "variants",
      discount: "variants",
      description: "description",
      describe: "description",
      brand: "brand",
      categories: "categories",
      category: "categories",
      stock: "variants",
      quantity: "variants",
      available: "variants",
      image: "images",
      photo: "images",
      picture: "images",
      variant: "variants",
      option: "variants",
      color: "variants",
      size: "variants",
      status: "status",
      active: "status",
      // Thêm các keyword mới
      material: "description",
      fabric: "description",
      delivery: "description",
      shipping: "description",
      return: "description",
    };

    // Tìm field khớp với keyword
    const matchedFields = new Set<string>();
    for (const keyword of keywords) {
      if (fieldMapping[keyword]) {
        matchedFields.add(fieldMapping[keyword]);
      }
    }

    // Trả lời dựa trên field nếu có
    if (matchedFields.size > 0) {
      return this.generateAnswerFromFields(
        [...matchedFields],
        product,
        originalQuestion
      );
    }

    return null;
  }

  private generateAnswerFromFields(
    fields: string[],
    product: ProductDto,
    question: string
  ): string {
    const answers: string[] = [];

    fields.forEach((field) => {
      switch (field) {
        case "variants":
          // Xử lý câu hỏi cụ thể về variants
          if (question.includes("price") || question.includes("cost")) {
            const prices = product.variants!.map((v) => v.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            if (minPrice === maxPrice) {
              answers.push(`All variants cost $${minPrice}`);
            } else {
              answers.push(`Price ranges from $${minPrice} to $${maxPrice}`);
            }
          } else if (
            question.includes("stock") ||
            question.includes("quantity")
          ) {
            const totalStock = product.variants!.reduce(
              (sum, variant) => sum + variant.stock_quantity,
              0
            );
            answers.push(`Total available stock: ${totalStock} items`);
          } else if (question.includes("color") || question.includes("size")) {
            const attributes: Record<string, Set<string>> = {};

            product.variants!.forEach((variant) => {
              variant.attributes.forEach((attr) => {
                if (!attributes[attr.key]) {
                  attributes[attr.key] = new Set();
                }
                attributes[attr.key].add(attr.value);
              });
            });

            const attributeInfo = Object.entries(attributes)
              .map(
                ([key, values]) => `${key}: ${Array.from(values).join(", ")}`
              )
              .join("\n");

            answers.push(`Available options:\n${attributeInfo}`);
          } else {
            // Trả lời mặc định nếu không có câu hỏi cụ thể
            const variantInfo = product
              .variants!.map(
                (v) =>
                  `Options: ${v.attributes.map((a) => `${a.key}: ${a.value}`).join(", ")}`
              )
              .join("\n");
            answers.push(`Available variants:\n${variantInfo}`);
          }
          break;

        case "description":
          answers.push(`Product description: ${product.description}`);
          break;

        case "brand":
          answers.push(`Brand: ${product.brand}`);
          break;

        case "categories":
          const categories = product.categories!.join(", ");
          answers.push(`Categories: ${categories}`);
          break;

        case "images":
          answers.push(`Product has ${product.images!.length} images`);
          break;

        case "status":
          answers.push(`Product is ${product.status ? "active" : "inactive"}`);
          break;
      }
    });

    return answers.join("\n\n");
  }

  private classifyQuestion(question: string): "PRODUCT" | "GENERAL" | "STYLE" {
    const lowerQuestion = question.toLowerCase();

    // Câu hỏi về sản phẩm cụ thể
    const productKeywords = [
      "this product",
      "this item",
      "it",
      "price",
      "cost",
      "stock",
      "quantity",
      "color",
      "size",
      "variant",
      "option",
      "available",
      "shipping",
      "delivery",
      "material",
      "fabric",
      "brand",
    ];

    // Câu hỏi về style và thông tin cá nhân
    const styleKeywords = [
      "style",
      "suit me",
      "fit me",
      "body shape",
      "height",
      "weight",
      "favorite color",
      "favourite color",
      "avoided color",
      "avoided colors",
      "favorite pattern",
      "body type",
      "recommend for me",
      "advice for me",
      "styling advice",
      "personal stylist",
      "personal style",
      "what should I wear",
      "outfit suggestion",
      "outfit recommendations",
      "outfit ideas",
      "look good on me",
      "match my style",
      "my style",
      "my body",
      "my shape",
      "my preference",
    ];

    // Câu hỏi chung không cần sản phẩm
    const generalKeywords = [
      "hello",
      "hi",
      "hey",
      "help",
      "support",
      "contact",
      "policy",
      "return",
      "refund",
      "store",
      "location",
      "hour",
      "open",
      "close",
      "ship",
      "joke",
      "weather",
      "recommend",
      "suggest",
      "advice",
      "styling",
    ];

    if (styleKeywords.some((kw) => lowerQuestion.includes(kw))) {
      return "STYLE";
    }

    if (productKeywords.some((kw) => lowerQuestion.includes(kw))) {
      return "PRODUCT";
    }

    if (generalKeywords.some((kw) => lowerQuestion.includes(kw))) {
      return "GENERAL";
    }

    // Mặc định xử lý như câu hỏi chung
    return "GENERAL";
  }
}

export default new ChatService();
