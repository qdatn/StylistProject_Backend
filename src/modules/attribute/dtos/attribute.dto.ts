import { IsString, IsArray } from "class-validator";

export default class AttributeDTO {
  @IsString()
  key?: string;

  @IsString()
  @IsArray()
  value?: string[];

  constructor(key?: string, value?: string[]) {
    this.key = key;
    this.value = value;
  }
}
