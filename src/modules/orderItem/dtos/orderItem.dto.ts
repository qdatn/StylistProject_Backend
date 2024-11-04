import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsMongoId,
  Min,
} from "class-validator";

export default class OrderItemDTO {
  @IsMongoId()
  @IsNotEmpty()
  order: Object;

  @IsMongoId()
  @IsNotEmpty()
  product: Object;

  @IsInt()
  @Min(1, { message: "Quantity must be at least 1" })
  quantity: number;

  @IsOptional()
  @IsString()
  note?: string;

  constructor(order: Object, product: Object, quantity: number, note?: string) {
    this.order = order;
    this.product = product;
    this.quantity = quantity;
    this.note = note;
  }
}
