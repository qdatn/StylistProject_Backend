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
  comment_id: Object;
  product_id: Object;
  user_id: Object;

  @IsNumber()
  rating: number;

  @IsString()
  @IsOptional()
  review: string;

  constructor(
    comment_id: Object,
    product_id: Object,
    user_id: Object,
    rating: number,
    review: string
  ) {
    this.comment_id = comment_id;
    this.product_id = product_id;
    this.user_id = user_id;
    this.rating = rating;
    this.review = review;
  }
}
