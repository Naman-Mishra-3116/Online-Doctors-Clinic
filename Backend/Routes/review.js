import {
  getAllReviews,
  createReview,
} from "../controllers/reviewControllers.js";
import { authenticate, restrict } from "./../auth/verifyToken.js";
import { Router } from "express";

const router = Router({ mergeParams: true });



router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);

export { router as ReviewRouter };
