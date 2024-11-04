import { IAuth } from "@modules/auth";
import {IProduct} from "@modules/product";

export default interface CustomRequest extends Request {
  user: IAuth;
  product: IProduct;
}
