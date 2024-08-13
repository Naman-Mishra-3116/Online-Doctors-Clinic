import Doctor from "../models/DoctorSchema.js";
import BookingSchema from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Succesfully updated",
      data: updatedDoctor,
      error: false,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      error: true,
      message: "Error in updating the Doctor",
    });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    await Doctor.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Doctor Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in deleting the doctor" });
  }
};

export const getSingleDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate({
      path: "reviews",
      populate: {
        path: "user",
      },
    });

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Successful", data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    res.status(200).json({
      success: true,
      message: "Doctors found Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.userId;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(200)
        .json({ message: "Doctor not found", success: false, erro: true });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await BookingSchema.find({ doctor: doctorId });
    res.status(200).json({
      success: true,
      message: "Profile info obtained",
      data: { ...rest, appointments },
      error: false,
    });
  } catch (error) {
    res
      .status(200)
      .json({ message: error.message, error: true, success: false });
  }
};
