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
];

const app = new App(routes);
app.listen();
