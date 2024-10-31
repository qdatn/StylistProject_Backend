import CommentRepository from "./comment.repository";
import CommentDto from "./dtos/comment.dto";

class CommentService {
  async createComment(commentData: CommentDto) {
    return await CommentRepository.create(commentData);
  }

  async getAllComments() {
    return await CommentRepository.findAll();
  }

  async getCommentById(commentId: string) {
    const comment = await CommentRepository.findByCommentId(commentId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }
  async getCommentByProductId(productId: string) {
    const comment = await CommentRepository.findByProductId(productId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  async getCommentByUserId(userId: string) {
    const comment = await CommentRepository.findByUserId(userId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  async updateComment(commentId: string, updateData: CommentDto) {
    return await CommentRepository.update(commentId, updateData);
  }

  async deleteComment(commentId: string) {
    const comment = await CommentRepository.delete(commentId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  //   async searchComments(filter) {
  //     return await commentRepository.findByFilter(filter);
  //   }
}

export default new CommentService();
