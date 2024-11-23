import { IsNotEmpty, IsString, IsMongoId, IsJWT } from "class-validator";

export default class LoginDto {
  @IsNotEmpty()
  @IsMongoId()
  public _id: Object;
  @IsNotEmpty()
  public email: string;
  // @IsNotEmpty()
  // public password: string;
  @IsString()
  public role: string;
  @IsJWT()
  token?: string;

  constructor(
    _id: Object,
    email: string,
    // password: string,
    role: string,
    token?: string
  ) {
    this._id = _id;
    this.email = email;
    // this.password = password;
    this.role = role;
    this.token = token;
  }
}
