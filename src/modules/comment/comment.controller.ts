import { pagination } from "@core/middlewares";
import CommentService from "./comment.service";
import { Request, Response, NextFunction } from "express";

class CommentController {
  async createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const comment = await CommentService.createComment(req.body);
      res.status(201).json(comment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllComments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const comments = await CommentService.getAllComments();
      // Pagination for object comment data got from api getAll
      await pagination(req, res, comments, next);
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCommentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const comment = await CommentService.getCommentById(req.params.id);
      res.status(200).json(comment);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async getCommentByProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const comments = await CommentService.getCommentByProductId(req.params.id);
      await pagination(req, res, comments, next);
      res.status(200).json(res.locals.pagination);
      // res.status(200).json(comments);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async getCommentByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const comment = await CommentService.getCommentByUserId(req.params.id);
      res.status(200).json(comment);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedComment = await CommentService.updateComment(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedComment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await CommentService.deleteComment(req.params.id);
      res.status(200).send({ message: "Comment deleted successfully" });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  //   async search(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ): Promise<void> {
  //     try {
  //       const { product_id, comment_id, user_id } = req.query;
  //       const filter = {};

  //       if (product_id) filter.product_id = product_id;
  //       if (comment_id) filter._id = comment_id; // Using _id for comment_id
  //       if (user_id) filter.user_id = user_id;

  //       const comments = await CommentService.searchComments(filter);
  //       res.json(comments);
  //     } catch (error) {
  //       res.status(500).json({ message: error.message });
  //     }
  //   }
}

export default new CommentController();
