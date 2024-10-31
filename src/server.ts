// server.js
import App from "./app";

import {
  AuthRoute,
  UserInfoRoute,
  ProductRoute,
  CategoryRoute,
  AttributeRoute,
} from "@routes";

const routes = [
  AuthRoute,
  UserInfoRoute,
  ProductRoute,
  CategoryRoute,
  AttributeRoute,
];

const app = new App(routes);
app.listen();
