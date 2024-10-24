import commentRepository from "../repositories/commentRepo.js";

class CommentService {
  async createComment(commentData) {
    return await commentRepository.create(commentData);
  }

  async getAllComments() {
    return await commentRepository.findAll();
  }

  async getCommentById(commentId) {
    const comment = await commentRepository.findByCommentId(commentId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }
  async getCommentByProductId(productId) {
    const comment = await commentRepository.findByProductId(productId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  async getCommentByUserId(userId) {
    const comment = await commentRepository.findByUserId(userId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  async updateComment(commentId, updateData) {
    return await commentRepository.update(commentId, updateData);
  }

  async deleteComment(commentId) {
    const comment = await commentRepository.delete(commentId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  async searchComments(filter) {
    return await commentRepository.findByFilter(filter);
  }
}

export default new CommentService();
