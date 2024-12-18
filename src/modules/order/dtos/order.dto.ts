// dtos/orderDTO.js
import { OrderItemDTO } from "@modules/orderItem";
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

export default class OrderDTO {
  @IsMongoId()
  @IsNotEmpty()
  user: Object;

  // @IsArray()
  // @IsMongoId({ each: true })
  // @IsNotEmpty({ each: true })
  // order_items: OrderItemDTO[];

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

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDate()
  @Type(() => Date)
  receive_date: Date;

  constructor(
    user_id: Object,
    status: string,
    discount: number,
    total_price: number,
    method: string,
    address: string,
    receive_date: Date
  ) {
    this.user = user_id;
    this.status = status;
    this.discount = discount;
    this.total_price = total_price;
    this.method = method;
    this.address = address;
    this.receive_date = receive_date;
  }
}
