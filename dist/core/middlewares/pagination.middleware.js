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
Object.defineProperty(exports, "__esModule", { value: true });
const pagination = (req, res, data, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse query parameters for pagination
        const page = parseInt(req.query.page) || 1; // default to page 1
        const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
        // Calculate the number of documents to skip
        // const skip: number = (page - 1) * limit;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        // Fetch the products with pagination
        // const results = await model.find().skip(skip).limit(limit);
        const results = yield data.slice(startIndex, endIndex);
        // Get the total count for pagination metadata
        // const totalItems = await model.countDocuments();
        const totalItems = data.length;
        // Send the response with pagination metadata
        res.locals.pagination = {
            data: results,
            pagination: {
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                pageSize: results.length,
            },
        };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = pagination;
//# sourceMappingURL=pagination.middleware.js.map