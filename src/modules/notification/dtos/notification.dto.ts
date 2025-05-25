import {
  IsString,
  IsNotEmpty,
} from "class-validator";

export default class NotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

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

  @IsString()
  productId?: string;

  constructor(
    userId: string,
    type: string,
    title: string,
    priority: string,
    content: string,
    status: string,
    productId?: string
  ) {
    this.userId = userId;
    this.type = type;
    this.title = title;
    this.priority = priority;
    this.content = content;
    this.status = status;
    this.productId = productId;
  }
}



