import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsMongoId,
  Min,
  IsArray,
} from "class-validator";

export default class OrderItemDTO {
  @IsMongoId()
  @IsNotEmpty()
  order: Object;

  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @IsInt()
  @Min(1, { message: "Quantity must be at least 1" })
  quantity: number;

  @IsArray()
  attributes: Object[];

  @IsOptional()
  @IsString()
  note?: string;

  constructor(
    order: Object,
    product: string,
    quantity: number,
    attributes: Object[],
    note?: string
  ) {
    this.order = order;
    this.product = product;
    this.quantity = quantity;
    this.attributes = attributes;
    this.note = note;
  }
}
