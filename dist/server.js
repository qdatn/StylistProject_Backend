"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const app_1 = __importDefault(require("./app"));
const _routes_1 = require("./routes");
const routes = [
    _routes_1.AuthRoute,
    _routes_1.UserInfoRoute,
    _routes_1.ProductRoute,
    _routes_1.CategoryRoute,
    _routes_1.AttributeRoute,
    _routes_1.CartRoute,
    _routes_1.CommentRoute,
    _routes_1.DiscountRoute,
    _routes_1.OrderRoute,
    _routes_1.OrderItemRoute,
    _routes_1.AddressRoute,
    _routes_1.PaymentRoute,
    _routes_1.StatisticRoute,
    _routes_1.ChatRoute,
    _routes_1.NotificationRoute,
    _routes_1.StylePreferenceRoute
];
const app = new app_1.default(routes);
app.listen();
//# sourceMappingURL=server.js.map