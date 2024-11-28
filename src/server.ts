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
];

const app = new App(routes);
app.listen();
