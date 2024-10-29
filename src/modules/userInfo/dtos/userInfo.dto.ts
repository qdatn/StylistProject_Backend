import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
  IsArray,
  IsMongoId,
} from "class-validator";
import { Type } from "class-transformer"; // dùng cho việc chuyển đổi kiểu

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export default class UserInfoDto {
  @IsMongoId()
  user: Object; // ObjectId

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDate()
  @Type(() => Date) // để đảm bảo biến được chuyển đổi thành kiểu Date
  birthday?: Date;

  @IsOptional()
  @IsString()
  body_shape?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // kiểm tra từng phần tử trong mảng
  style_preferences?: string[];

  constructor(data: {
    user: string;
    name: string;
    phone_number?: string;
    gender?: Gender;
    birthday?: Date;
    body_shape?: string;
    height?: number;
    weight?: number;
    style_preferences?: string[];
  }) {
    this.user = data.user;
    this.name = data.name;
    this.phone_number = data.phone_number;
    this.gender = data.gender;
    this.birthday = data.birthday;
    this.body_shape = data.body_shape;
    this.height = data.height;
    this.weight = data.weight;
    this.style_preferences = data.style_preferences;
  }
}
