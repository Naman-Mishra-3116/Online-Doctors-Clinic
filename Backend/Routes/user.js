import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
} from "../controllers/userController.js";
import { Router } from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

export { router as UserRouter };
