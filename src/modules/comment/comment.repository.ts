import Comment from "./comment.model";
import CommentDto from "./dtos/comment.dto";

class CommentRepository {
  async create(commentData: CommentDto) {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  async findAll() {
    return await Comment.find().populate("product").populate("user", "email");
  }

  async findByCommentId(commentId: string) {
    return await Comment.find({ _id: commentId })
      .populate("product")
      .populate("user");
  }

  async findByProductId(productId: string) {
    return await Comment.find({ product: productId })
      // .populate("product")
      .populate("user_info");
  }
  async findByUserId(userId: string) {
    return await Comment.find({ user: userId })
      .populate("product")
      .populate("user", "email");
  }

  async update(commentId: string, updateData: CommentDto) {
    return await Comment.findByIdAndUpdate(commentId, updateData, {
      new: true,
    });
  }

  async delete(commentId: string) {
    return await Comment.findByIdAndDelete(commentId);
  }

  //   async findByFilter(filter) {
  //     return await Comment.find(filter)
  //       .populate("product_id")
  //       .populate("user_id");
  //   }
}

export default new CommentRepository();
