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
// Discount Schema
const discountSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ["product", "category", "all"],
    },
    value: { type: Number, required: true },
    minimum_value: { type: Number },
    max_discount: { type: Number },
    apply_items: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: function () {
                return this.type === "product" ? "Product" : "Category";
            },
        },
    ],
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    usage_limit: { type: Number, default: 1, min: 1 },
    used_count: { type: Number, default: 0, min: 0 },
    status: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const Discount = mongoose_1.default.model("Discount", discountSchema);
exports.default = Discount;
//# sourceMappingURL=discount.model.js.map