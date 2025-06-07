"use strict";
// import { getGeminiRecommendation } from "../../core/utils/geminiApi";
// import { UserInfo } from "../userInfo";
// import Product from "./product.model";
// const getRecommendedProductsForUser = async (userId: string) => {
//   // 1. Get UserInfo & StylePreference
//   const userInfo = await UserInfo.findOne({ user: userId }).populate(
//     "style_preferences"
//   );
//   if (!userInfo || !userInfo.style_preferences) {
//     throw new Error("User info or style preferences not found");
//   }
//   const stylePreferences = userInfo.style_preferences;
//   // 2. Get all products
//   const products = await Product.find({ status: true }).lean();
//   // 3. Generate prompt for Gemini
//   const prompt = `
// Based on the following fashion style preferences of the user:
// ${JSON.stringify(stylePreferences, null, 2)}
// Please evaluate how well each product matches the user's preferences on a scale from 0 to 10, where a higher score indicates a better match.
// Return a list of products sorted by relevance score in descending order, in the following JSON format:
// [
//   {
//     product_id: "...",
//     score: 9.5
//   },
//   ...
// ]
// Here is the list of products:
// ${JSON.stringify(products, null, 2)}
// `;
//   // 4. Gửi đến Gemini API để đánh giá độ phù hợp
//   const recommended = await getGeminiRecommendation(prompt);
//   // 5. Parse kết quả và sắp xếp sản phẩm theo điểm
//   const scoresMap = new Map();
//   recommended.forEach((item: any) => {
//     scoresMap.set(item.product_id, item.score);
//   });
//   const sortedProducts = products.sort((a: any, b: any) => {
//     const scoreA = scoresMap.get(String(a._id)) || 0;
//     const scoreB = scoresMap.get(String(b._id)) || 0;
//     return scoreB - scoreA;
//   });
//   const sortedProductIds = sortedProducts.map((item) => item._id);
//   return sortedProductIds;
// };
// export default getRecommendedProductsForUser;
//# sourceMappingURL=product.bot.js.map