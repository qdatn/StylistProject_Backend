import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
  IsMongoId,
  IsArray,
} from "class-validator";
import "reflect-metadata";
import { Type } from "class-transformer";

export class AttributeDTO {
  @IsString()
  key!: string;

  @IsString()
  value!: string;
}

export class ProductVariantDTO {
  @IsArray()
  @Type(() => AttributeDTO)
  attributes!: AttributeDTO[];

  @IsNumber()
  price!: number;

  @IsNumber()
  stock_quantity!: number;

  @IsNumber()
  min_quantity!: number;

  @IsOptional()
  @IsNumber()
  sold_quantity?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  stock_update_date?: Date;
}

export default class ProductDto {
  @IsMongoId()
  _id?: Object;

  @IsString()
  product_name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsMongoId()
  categories?: Object[];

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsString()
  @IsOptional()
  images?: string[];

  @IsArray()
  // attributes?: Object[];
  variants?: ProductVariantDTO[];

  @IsDate()
  createdAt?: Date;
  @IsDate()
  updatedAt?: Date;

  constructor(
    _id: Object,
    product_name: string,
    description?: string,
    brand?: string,
    categories?: Object[],
    status?: boolean,
    images?: string[],
    variants?: ProductVariantDTO[],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = _id;
    this.product_name = product_name;
    this.description = description;
    this.brand = brand;
    this.categories = categories;
    this.status = status;
    this.images = images;
    this.variants = variants;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
