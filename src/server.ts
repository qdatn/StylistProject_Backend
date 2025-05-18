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
];

const app = new App(routes);
app.listen();
