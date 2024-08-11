import User from "../models/UserSchema.js";

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
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updating the user",
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
    res
      .status(200)
      .json({ success: true, message: "User found Successfully", data: user });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No user found with specified id" });
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
