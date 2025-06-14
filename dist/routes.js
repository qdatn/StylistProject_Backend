"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylePreferenceRoute = exports.NotificationRoute = exports.ChatRoute = exports.StatisticRoute = exports.PaymentRoute = exports.AddressRoute = exports.OrderItemRoute = exports.OrderRoute = exports.DiscountRoute = exports.CommentRoute = exports.CartRoute = exports.AttributeRoute = exports.CategoryRoute = exports.ProductRoute = exports.UserInfoRoute = exports.AuthRoute = void 0;
const auth_1 = require("./modules/auth");
Object.defineProperty(exports, "AuthRoute", { enumerable: true, get: function () { return auth_1.AuthRoute; } });
const userInfo_1 = require("./modules/userInfo");
Object.defineProperty(exports, "UserInfoRoute", { enumerable: true, get: function () { return userInfo_1.UserInfoRoute; } });
const product_1 = require("./modules/product");
Object.defineProperty(exports, "ProductRoute", { enumerable: true, get: function () { return product_1.ProductRoute; } });
const category_1 = require("./modules/category");
Object.defineProperty(exports, "CategoryRoute", { enumerable: true, get: function () { return category_1.CategoryRoute; } });
const attribute_1 = require("./modules/attribute");
Object.defineProperty(exports, "AttributeRoute", { enumerable: true, get: function () { return attribute_1.AttributeRoute; } });
const cart_1 = require("./modules/cart");
Object.defineProperty(exports, "CartRoute", { enumerable: true, get: function () { return cart_1.CartRoute; } });
const comment_1 = require("./modules/comment");
Object.defineProperty(exports, "CommentRoute", { enumerable: true, get: function () { return comment_1.CommentRoute; } });
const discount_1 = require("./modules/discount");
Object.defineProperty(exports, "DiscountRoute", { enumerable: true, get: function () { return discount_1.DiscountRoute; } });
const order_1 = require("./modules/order");
Object.defineProperty(exports, "OrderRoute", { enumerable: true, get: function () { return order_1.OrderRoute; } });
const orderItem_1 = require("./modules/orderItem");
Object.defineProperty(exports, "OrderItemRoute", { enumerable: true, get: function () { return orderItem_1.OrderItemRoute; } });
const address_1 = require("./modules/address");
Object.defineProperty(exports, "AddressRoute", { enumerable: true, get: function () { return address_1.AddressRoute; } });
const payment_1 = require("./modules/payment");
Object.defineProperty(exports, "PaymentRoute", { enumerable: true, get: function () { return payment_1.PaymentRoute; } });
const statistic_1 = require("./modules/statistic");
Object.defineProperty(exports, "StatisticRoute", { enumerable: true, get: function () { return statistic_1.StatisticRoute; } });
const chat_1 = require("./modules/chat");
Object.defineProperty(exports, "ChatRoute", { enumerable: true, get: function () { return chat_1.ChatRoute; } });
const notification_1 = require("./modules/notification");
Object.defineProperty(exports, "NotificationRoute", { enumerable: true, get: function () { return notification_1.NotificationRoute; } });
const style_preference_1 = require("./modules/style_preference");
Object.defineProperty(exports, "StylePreferenceRoute", { enumerable: true, get: function () { return style_preference_1.StylePreferenceRoute; } });
//# sourceMappingURL=routes.js.map