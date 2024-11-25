import {
  IsString,
  IsNumber,
  IsOptional,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";

export default class CommentDto {
  @IsMongoId()
  @IsNotEmpty()
  comment: string;
  product: Object;
  user: Object;

  @IsNumber()
  rating: number;

  @IsString()
  @IsOptional()
  review: string;

  constructor(
    comment: string,
    product: Object,
    user: Object,
    rating: number,
    review: string
  ) {
    this.comment = comment;
    this.product = product;
    this.user = user;
    this.rating = rating;
    this.review = review;
  }
}
