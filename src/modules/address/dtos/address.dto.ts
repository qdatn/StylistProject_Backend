import { IsString } from "class-validator";

export default class AttributeDTO {
  @IsString()
  user: string;

  @IsString()
  name: string;

  @IsString()
  phone_num: string;

  @IsString()
  address: string;

  constructor(user: string, name: string, phone_num: string, address: string) {
    this.user = user;
    this.name = name;
    this.phone_num = phone_num;
    this.address = address;
  }
}
