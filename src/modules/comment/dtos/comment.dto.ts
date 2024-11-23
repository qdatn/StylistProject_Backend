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
  comment: Object;
  product: Object;
  user_id: Object;

  @IsNumber()
  rating: number;

  @IsString()
  @IsOptional()
  review: string;

  constructor(
    comment: Object,
    product: Object,
    user_id: Object,
    rating: number,
    review: string
  ) {
    this.comment = comment;
    this.product = product;
    this.user_id = user_id;
    this.rating = rating;
    this.review = review;
  }
}
