import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    const authToken = token.split(" ")[1];
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "token has expired" });
    }

    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.userId;
    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    if (!roles.includes(user.role)) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }
    next();
  } catch (error) {}
};
