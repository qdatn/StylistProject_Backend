import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
  IsMongoId,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";

export default class ProductDto {
  @IsMongoId()
  _id?: Object;

  @IsString()
  product_name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  stock_quantity: number;

  @IsNumber()
  min_quantity: number;

  @IsNumber()
  @IsOptional()
  sold_quantity?: number = 0;

  @IsMongoId()
  categories?: Object;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  stock_update_date?: Date;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  attributes?: Object[];

  @IsDate()
  createAt?: Date;
  @IsDate()
  updateAt?: Date;

  constructor(
    _id: Object,
    product_name: string,
    price: number,
    stock_quantity: number,
    min_quantity: number,
    description?: string,
    brand?: string,
    sold_quantity?: number,
    categories?: Object,
    stock_update_date?: Date,
    status?: boolean,
    image?: string,
    attributes?: Object[],
    createAt?: Date,
    updateAt?: Date
  ) {
    this._id = _id;
    this.product_name = product_name;
    this.price = price;
    this.description = description;
    this.brand = brand;
    this.stock_quantity = stock_quantity;
    this.min_quantity = min_quantity;
    this.sold_quantity = sold_quantity;
    this.categories = categories;
    this.stock_update_date = stock_update_date;
    this.status = status;
    this.image = image;
    this.attributes = attributes;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }
}
