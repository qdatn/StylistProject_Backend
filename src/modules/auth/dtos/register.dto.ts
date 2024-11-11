import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export default class RegisterDto {
  @IsString()
  @MinLength(2, {
    message: "Title must be at least 2 characters long",
  })
  @MaxLength(50, {
    message: "Title must be at most 50 characters long",
  })
  public name: string;
  @IsNotEmpty()
  public email: string;
  @IsNotEmpty()
  public password: string;
  @IsString()
  public role: string;
  @IsString()
  public otp: string;

  constructor(
    name: string,
    email: string,
    password: string,
    role: string,
    otp: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.otp = otp;
  }
}
