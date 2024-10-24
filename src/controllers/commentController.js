import commentService from "../services/commentService.js";

class CommentController {
  async createComment(req, res) {
    try {
      const comment = await commentService.createComment(req.body);
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await commentService.getAllComments();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await commentService.getCommentById(req.params.id);
      res.json(comment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getCommentByProductId(req, res) {
    try {
      const comment = await commentService.getCommentByProductId(req.params.id);
      res.json(comment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getCommentByUserId(req, res) {
    try {
      const comment = await commentService.getCommentByUserId(req.params.id);
      res.json(comment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const updatedComment = await commentService.updateComment(
        req.params.id,
        req.body
      );
      res.json(updatedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      await commentService.deleteComment(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async search(req, res) {
    try {
      const { product_id, comment_id, user_id } = req.query;
      const filter = {};

      if (product_id) filter.product_id = product_id;
      if (comment_id) filter._id = comment_id; // Using _id for comment_id
      if (user_id) filter.user_id = user_id;

      const comments = await commentService.searchComments(filter);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CommentController();
