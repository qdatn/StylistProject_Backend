import { IAuth } from "@modules/auth";

export default interface CustomRequest extends Request {
  user: IAuth;
}
