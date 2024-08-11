import {
  updateDoctor,
  getAllDoctor,
  getSingleDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { ReviewRouter } from "./review.js";

import { Router } from "express";
const router = Router();

router.use("/:doctorId/reviews", ReviewRouter);
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["patient"]), deleteDoctor);

export { router as DoctorRouter };
