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
const address_service_1 = __importDefault(require("./address.service"));
class AddressController {
    createAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield address_service_1.default.createAddress(req.body);
                res.status(201).json(address);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAddressUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield address_service_1.default.getAddressUserById(req.params.userid);
                if (!address) {
                    res.status(404).json({ error: "Address not found" });
                }
                else {
                    res.json(address);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAddressById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield address_service_1.default.getAddressById(req.params.id);
                if (!address) {
                    res.status(404).json({ error: "Address not found" });
                }
                else {
                    res.json(address);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllAddresses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addresses = yield address_service_1.default.getAllAddresses();
                res.json(addresses);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield address_service_1.default.updateAddress(req.params.id, req.body);
                if (!address) {
                    res.status(404).json({ error: "Address not found" });
                }
                else {
                    res.json(address);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield address_service_1.default.deleteAddress(req.params.id);
                if (!address) {
                    res.status(404).json({ error: "Address not found" });
                }
                else {
                    res.json({ message: "Address deleted successfully" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AddressController();
//# sourceMappingURL=address.controller.js.map