import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
  IsArray,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer"; // dùng cho việc chuyển đổi kiểu
import AuthDto from "@/modules/auth/dtos/auth.dto";
enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export default class UserInfoDto {
  @IsMongoId()
  _id: Object; // ObjectId

  @IsNotEmpty()
  user: AuthDto;

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

  @IsDate()
  createAt?: Date;
  updateAt?: Date;

  constructor(
    _id: Object,
    user: AuthDto,
    name: string,
    phone_number?: string,
    gender?: Gender,
    birthday?: Date,
    body_shape?: string,
    height?: number,
    weight?: number,
    style_preferences?: string[],
    createAt?: Date,
    updateAt?: Date
  ) {
    this._id = _id;
    this.user = user;
    this.name = name;
    this.phone_number = phone_number;
    this.gender = gender;
    this.birthday = birthday;
    this.body_shape = body_shape;
    this.height = height;
    this.weight = weight;
    this.style_preferences = style_preferences;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }
}
