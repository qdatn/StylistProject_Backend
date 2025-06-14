"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemSchema = void 0;
const middlewares_1 = require("../../core/middlewares");
const mongoose_1 = __importStar(require("mongoose"));
// Define the orderItem Schema
exports.orderItemSchema = new mongoose_1.Schema({
    order: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Order" },
    product: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Product" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    attributes: [
        {
            key: { type: String },
            value: { type: String },
        },
    ],
    note: { type: String },
}, { timestamps: true });
// Middleware giảm số lượng sản phẩm khi lưu OrderItem
exports.orderItemSchema.pre("save", middlewares_1.reduceProductStock);
exports.orderItemSchema.post("findOneAndDelete", middlewares_1.increaseProductStock);
// Create the model based on the schema
const OrderItem = mongoose_1.default.model("OrderItem", exports.orderItemSchema);
exports.default = OrderItem;
//# sourceMappingURL=orderItem.model.js.map