import { IsString, IsNotEmpty, IsMongoId, IsArray, IsObject } from "class-validator";
import { ObjectId } from "mongodb";

export default class NotificationDto {
  @IsArray()
  @IsNotEmpty()
  user: ObjectId[];

  @IsString()
  type?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  priority?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  status: string;

  @IsObject()
  order?: ObjectId;

  constructor(
    user: ObjectId[],
    type: string,
    title: string,
    priority: string,
    content: string,
    status: string,
    order?: ObjectId
  ) {
    this.user = user;
    this.type = type;
    this.title = title;
    this.priority = priority;
    this.content = content;
    this.status = status;
    this.order = order;
  }
}
