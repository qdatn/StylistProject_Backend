// server.js
import App from "./app";

import {
  AuthRoute,
  UserInfoRoute,
  ProductRoute,
  CategoryRoute,
  AttributeRoute,
  CartRoute,
  CommentRoute,
  DiscountRoute,
  OrderRoute,
  OrderItemRoute,
  AddressRoute,
  PaymentRoute,
  StatisticRoute,
  ChatRoute,
  NotificationRoute,
  StylePreferenceRoute
} from "@routes";

const routes = [
  AuthRoute,
  UserInfoRoute,
  ProductRoute,
  CategoryRoute,
  AttributeRoute,
  CartRoute,
  CommentRoute,
  DiscountRoute,
  OrderRoute,
  OrderItemRoute,
  AddressRoute,
  PaymentRoute,
  StatisticRoute,
  ChatRoute,
  NotificationRoute,
  StylePreferenceRoute
];

const app = new App(routes);
app.listen();
