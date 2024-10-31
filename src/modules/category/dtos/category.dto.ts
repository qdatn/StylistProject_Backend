import { IsString, IsDate, IsMongoId } from "class-validator";

export default class CategoryDTO {
  //   @IsMongoId()
  //   _id?: Object;

  @IsString()
  category_name?: string;

  @IsString()
  description?: string;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;

  constructor(
    // _id?: Object,
    category_name?: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    // this._id = _id; // Tạo ObjectId mới nếu không có _id
    this.category_name = category_name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
