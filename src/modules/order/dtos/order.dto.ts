// dtos/orderDTO.js
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsMongoId,
  IsArray,
  Min,
  IsDate,
} from "class-validator";

export class OrderDTO {
  @IsMongoId()
  @IsNotEmpty()
  user_id: Object;

  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty({ each: true })
  order_items: Object[];

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @Min(0)
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: "Total price must be a positive number" })
  total_price: number;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsDate()
  @Type(() => Date)
  receive_date: Date;

  constructor(
    user_id: Object,
    order_items: Object[],
    status: string,
    discount: number,
    total_price: number,
    method: string,
    receive_date: Date
  ) {
    this.user_id = user_id;
    this.order_items = order_items;
    this.status = status;
    this.discount = discount;
    this.total_price = total_price;
    this.method = method;
    this.receive_date = receive_date;
  }
}
