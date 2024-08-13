import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Succesfully updated",
      error: false,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updating the user",
      error: true,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in deleting the user" });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found Successfully",
      data: user,
      error: false,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "No user found with specified id",
      error: true,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users found Successfully",
      data: users,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false, erro: true });
    }

    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile info obtained",
      data: { ...rest },
      error: false,
    });
  } catch (error) {
    res
      .status(200)
      .json({ message: error.message, error: true, success: false });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.uesrId });
    const doctorIds = bookings.map((el) => el.doctor.id);
    const doctors = await DoctorSchema.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res.status(200).json({
      message: "Appointments recieved",
      success: true,
      error: false,
      data: doctors,
    });
  } catch (err) {
    console.log(
      "Error is occuring in userController getMyAppointments Function",
      err
    );
    res.status(200).json({ message: err.message, error: true, success: false });
  }
};
