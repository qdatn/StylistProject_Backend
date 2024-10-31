import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsArray,
  IsMongoId,
  IsBoolean,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export default class DiscountDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @Min(0)
  value: number;

  @IsOptional()
  @IsNumber()
  minimum_value?: number;

  @IsOptional()
  @IsNumber()
  max_discount?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  apply_items?: string[];

  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsOptional()
  @IsNumber()
  @Min(1)
  usage_limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  used_count?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  constructor(
    code: string,
    type: string,
    value: number,
    start_date: Date,
    end_date: Date,
    minimum_value?: number,
    max_discount?: number,
    apply_items?: string[],
    usage_limit?: number,
    used_count?: number,
    status?: boolean
  ) {
    this.code = code;
    this.type = type;
    this.value = value;
    this.minimum_value = minimum_value;
    this.max_discount = max_discount;
    this.apply_items = apply_items;
    this.start_date = start_date;
    this.end_date = end_date;
    this.usage_limit = usage_limit;
    this.used_count = used_count;
    this.status = status;
  }
}
