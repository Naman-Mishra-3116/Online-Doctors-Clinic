import Doctor from "../models/DoctorSchema.js";

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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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
    const id = req.params.id;
    const doctor = await Doctor.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Doctor found Successfully",
      data: doctor,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No doctor found with specified id" });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doc = await Doctor.find({
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
    return res.status(404).json({ success: false, message: "Not found" });
  }
};
