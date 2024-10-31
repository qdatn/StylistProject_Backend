import { Router } from "express";
import CommentController from "./comment.controller";
import RouteInterface from "@core/interfaces/route.interface";

class CommentRoute implements RouteInterface {
  public path = "/api/v1/comment";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, CommentController.getAllComments);
    // this.router.get(`${this.path}/search`, CommentController.search); // New search endpoint
    this.router.get(`${this.path}/:id`, CommentController.getCommentById);
    this.router.get(
      `${this.path}/product/:id`,
      CommentController.getCommentByProductId
    );
    this.router.get(
      `${this.path}/user/:id`,
      CommentController.getCommentByUserId
    );
    this.router.post(`${this.path}/insert`, CommentController.createComment);
    this.router.put(`${this.path}/update/:id`, CommentController.updateComment);
    this.router.delete(
      `${this.path}/delete/:id`,
      CommentController.deleteComment
    );
  }
}

export default new CommentRoute();
