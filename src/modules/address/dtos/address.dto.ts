import { IsMongoId, IsString } from "class-validator";

export default class AttributeDTO {
  @IsMongoId()
  _id?: Object;

  @IsString()
  user: string;

  @IsString()
  name: string;

  @IsString()
  phone_num: string;

  @IsString()
  address: string;

  constructor(
    user: string,
    name: string,
    phone_num: string,
    address: string,
    _id?: Object
  ) {
    this._id = _id;
    this.user = user;
    this.name = name;
    this.phone_num = phone_num;
    this.address = address;
  }
}
