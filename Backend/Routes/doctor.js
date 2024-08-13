import {
  updateDoctor,
  getAllDoctor,
  getSingleDoctor,
  deleteDoctor,
  getDoctorProfile,
} from "../controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { ReviewRouter } from "./review.js";
import { Router } from "express";

const router = Router();

router.use("/:doctorId/reviews", ReviewRouter);
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export { router as DoctorRouter };
