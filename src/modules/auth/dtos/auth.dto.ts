import { isMongoId, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export default class AuthDto {
  @IsMongoId()
  public _id?: Object;
  @IsNotEmpty()
  public email: string;
  @IsNotEmpty()
  public password: string;
  @IsString()
  public role: string;

  constructor(email: string, password: string, role: string, _id?: Object) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
