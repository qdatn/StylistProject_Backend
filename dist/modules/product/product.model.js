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
const mongoose_1 = __importStar(require("mongoose"));
// Define the Product schema
const productSchema = new mongoose_1.Schema({
    product_name: { type: String, required: true },
    description: { type: String, default: "No description provided" },
    brand: { type: String, default: "No brand provided" },
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "Category",
        },
    ],
    status: { type: Boolean, default: true },
    images: { type: [String], default: [] },
    variants: [
        {
            attributes: [
                {
                    key: { type: String, required: true },
                    value: { type: String, required: true },
                },
            ],
            price: { type: Number, required: true },
            stock_quantity: { type: Number, required: true, default: 0 },
            min_quantity: { type: Number, required: true, default: 0 },
            sold_quantity: { type: Number, default: 0 },
            stock_update_date: { type: Date, default: new Date() },
        },
    ],
}, { timestamps: true });
// Create and export the model based on the schema
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map