import authMiddleware from "./auth.middleware";
import errorMiddleWare from "./error.middleware";
import authorizeMiddleware from "./author.middleware";
import reduceProductStock from "./reduceProductQty.middleware";
import increaseProductStock from "./increaseProductQty.middleware";

export {
  authMiddleware,
  errorMiddleWare,
  authorizeMiddleware,
  reduceProductStock,
  increaseProductStock,
};
