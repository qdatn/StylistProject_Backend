import { IsArray, IsMongoId } from "class-validator";

export default class CartDto {
  @IsMongoId()
  public user: Object;

  @IsArray()
  @IsMongoId({ each: true })
  public products: Object[];

  constructor(user: Object, products: Object[]) {
    this.user = user;
    this.products = products;
  }
}
