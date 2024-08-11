import mongoose from "mongoose";

/**
 * @UserSchema is the record type that will be there in each row of the database.
 * @email will be holding email ofthe user
 * @password this will be used for storing the hashed password of the user.
 * @name this is the name of the user with which the profile will be created.
 * @photo this is optional field that will be used for holding the pic refernce of the user.
 * @role enumeration type for patient and doctor
 * @gender enumeration for male, female and others
 * @bloodType for holding the patients blood group.
 * @appointment it is a reference to the other schema that will hold all the appointment for a patient.
 */

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  bloodType: {
    type: String,
  },
  appointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

export default mongoose.model("User", UserSchema);
