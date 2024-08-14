import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

export const register = async (req, res) => {
  try {
    const { email, password, name, role, photo, gender } = req.body;
    let user;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res
        .status(200)
        .json({ message: "User Already exist", success: true, error: false });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hasedPassword,
        photo,
        gender,
        role,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hasedPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "User created sucessfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password, email);
    let user;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: true, error: false });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);
    if (!isValidPassword) {
      return res
        .status(200)
        .json({ success: true, message: "Invalid credentials", error: false });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    const {
      password: { test },
      ...withoutPassword
    } = user._doc;
    res.status(200).json({
      error: false,
      success: true,
      message: "Successfully Logged In",
      token,
      user: withoutPassword,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};
