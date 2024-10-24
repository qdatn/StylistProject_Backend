import Comment from "../models/commentModel.js";

class CommentRepository {
  async create(commentData) {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  async findAll() {
    return await Comment.find().populate("product_id").populate("user_id");
  }

  async findByCommentId(commentId) {
    return await Comment.find({ comment_id: commentId })
      .populate("product_id")
      .populate("user_id");
  }

  async findByProductId(productId) {
    return await Comment.find({ product_id: productId })
      .populate("product_id")
      .populate("user_id");
  }
  async findByUserId(userId) {
    return await Comment.find({ user_id: userId })
      .populate("product_id")
      .populate("user_id");
  }

  async update(commentId, updateData) {
    return await Comment.findByIdAndUpdate(commentId, updateData, {
      new: true,
    });
  }

  async delete(commentId) {
    return await Comment.findByIdAndDelete(commentId);
  }

  async findByFilter(filter) {
    return await Comment.find(filter)
      .populate("product_id")
      .populate("user_id");
  }
}

export default new CommentRepository();
