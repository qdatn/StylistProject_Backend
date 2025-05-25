import { IsString, IsNotEmpty } from "class-validator";

export default class NotificationDto {
  @IsString()
  @IsNotEmpty()
  user: string;

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
  order?: string;

  constructor(
    user: string,
    type: string,
    title: string,
    priority: string,
    content: string,
    status: string,
    order?: string
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
