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
// src/repositories/AddressRepository.ts
const mongoose_1 = __importDefault(require("mongoose"));
const address_model_1 = __importDefault(require("./address.model"));
class AddressRepository {
    create(addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = new address_model_1.default(addressData);
            return yield address.save();
        });
    }
    findByUserId(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongoose_1.default.Types.ObjectId(userid);
            return yield address_model_1.default.find({ user: id })
                .populate("user")
                .sort({ createdAt: -1 });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongoose_1.default.Types.ObjectId(id);
            return yield address_model_1.default.findOne({ _id: _id })
                .populate("user")
                .sort({ createdAt: -1 });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield address_model_1.default.find().populate("user").sort({ createdAt: -1 });
        });
    }
    update(id, addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield address_model_1.default.findByIdAndUpdate(id, addressData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield address_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new AddressRepository();
//# sourceMappingURL=address.repository.js.map