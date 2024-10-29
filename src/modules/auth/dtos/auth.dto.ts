import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export default class AuthDto {
  @IsNotEmpty()
  public email: string;
  @IsNotEmpty()
  public password: string;
  @IsString()
  public role: string;

  constructor(email: string, password: string, role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
