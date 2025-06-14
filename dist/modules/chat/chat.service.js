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
const product_1 = require("../product");
const chat_model_1 = __importDefault(require("./chat.model"));
const gemini_service_1 = require("./gemini.service");
const userInfo_1 = require("../userInfo");
class ChatService {
    saveMessage(sender, receiver, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new chat_model_1.default({ sender, receiver, content });
            return yield message.save();
        });
    }
    getMessagesBetweenUsers(user1Id, user2Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = [user1Id, user2Id].sort().join("_");
            const messages = yield chat_model_1.default.find({ groupId }).sort({ timestamp: 1 });
            return messages;
        });
    }
    getMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.findById(id);
        });
    }
    getMessagesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.find({
                $or: [{ sender: userId }, { receiver: userId }],
            }).sort({ timestamp: -1 });
        });
    }
    deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield chat_model_1.default.findByIdAndDelete(id);
            return !!deleted;
        });
    }
    /*------------- CHAT BOT HERE --------------- */
    generateProductAnswer(productId, userId, question) {
        return __awaiter(this, void 0, void 0, function* () {
            const questionType = this.classifyQuestion(question);
            // 1. Xử lý câu hỏi không cần sản phẩm
            if (questionType === "GENERAL") {
                return yield (0, gemini_service_1.askGeminiAboutProduct)(question);
            }
            // 2. Xử lý câu hỏi về STYLE (ưu tiên xử lý trước PRODUCT)
            if (questionType === "STYLE") {
                const userinfo = yield userInfo_1.UserInfoService.getUserInfoById(userId);
                // Xử lý khi có productId
                if (productId) {
                    const product = yield product_1.ProductService.getProductById(productId);
                    return product
                        ? yield (0, gemini_service_1.askGeminiAboutProduct)(question, product, userinfo)
                        : yield (0, gemini_service_1.askGeminiAboutProduct)(question, null, userinfo);
                }
                // Xử lý khi không có productId nhưng cần thông tin style
                return userinfo
                    ? yield (0, gemini_service_1.askGeminiAboutProduct)(question, null, userinfo)
                    : "Please tell me about your style preferences first so I can help you better.";
            }
            // 3. Xử lý câu hỏi cần sản phẩm nhưng không có productId
            if (!productId) {
                return "Please specify a product first so I can help you better.";
            }
            const product = yield product_1.ProductService.getProductById(productId);
            if (!product) {
                return "Sorry, I couldn't find that product. Please check the product ID.";
            }
            // 1. Extract keywords from the question
            const keywords = this.extractKeywords(question.toLowerCase());
            const plainProduct = product.toObject();
            // 2. Check if keywords match product model fields
            const directAnswer = this.tryDirectAnswer(keywords, plainProduct, question);
            if (directAnswer) {
                return directAnswer;
            }
            // 3. If no direct match, use Gemini
            return product
                ? yield (0, gemini_service_1.askGeminiAboutProduct)(question, product)
                : yield (0, gemini_service_1.askGeminiAboutProduct)(question);
        });
    }
    extractKeywords(question) {
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
    tryDirectAnswer(keywords, product, originalQuestion) {
        const fieldMapping = {
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
        const matchedFields = new Set();
        for (const keyword of keywords) {
            if (fieldMapping[keyword]) {
                matchedFields.add(fieldMapping[keyword]);
            }
        }
        // Trả lời dựa trên field nếu có
        if (matchedFields.size > 0) {
            return this.generateAnswerFromFields([...matchedFields], product, originalQuestion);
        }
        return null;
    }
    generateAnswerFromFields(fields, product, question) {
        const answers = [];
        fields.forEach((field) => {
            switch (field) {
                case "variants":
                    // Xử lý câu hỏi cụ thể về variants
                    if (question.includes("price") || question.includes("cost")) {
                        const prices = product.variants.map((v) => v.price);
                        const minPrice = Math.min(...prices);
                        const maxPrice = Math.max(...prices);
                        if (minPrice === maxPrice) {
                            answers.push(`All variants cost $${minPrice}`);
                        }
                        else {
                            answers.push(`Price ranges from $${minPrice} to $${maxPrice}`);
                        }
                    }
                    else if (question.includes("stock") ||
                        question.includes("quantity")) {
                        const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock_quantity, 0);
                        answers.push(`Total available stock: ${totalStock} items`);
                    }
                    else if (question.includes("color") || question.includes("size")) {
                        const attributes = {};
                        product.variants.forEach((variant) => {
                            variant.attributes.forEach((attr) => {
                                if (!attributes[attr.key]) {
                                    attributes[attr.key] = new Set();
                                }
                                attributes[attr.key].add(attr.value);
                            });
                        });
                        const attributeInfo = Object.entries(attributes)
                            .map(([key, values]) => `${key}: ${Array.from(values).join(", ")}`)
                            .join("\n");
                        answers.push(`Available options:\n${attributeInfo}`);
                    }
                    else {
                        // Trả lời mặc định nếu không có câu hỏi cụ thể
                        const variantInfo = product
                            .variants.map((v) => `Options: ${v.attributes.map((a) => `${a.key}: ${a.value}`).join(", ")}`)
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
                    const categories = product.categories.join(", ");
                    answers.push(`Categories: ${categories}`);
                    break;
                case "images":
                    answers.push(`Product has ${product.images.length} images`);
                    break;
                case "status":
                    answers.push(`Product is ${product.status ? "active" : "inactive"}`);
                    break;
            }
        });
        return answers.join("\n\n");
    }
    classifyQuestion(question) {
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
exports.default = new ChatService();
//# sourceMappingURL=chat.service.js.map