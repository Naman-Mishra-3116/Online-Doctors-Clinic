import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose.set("strictQuery", false);
export const connectDatabase = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.log(`Error in connecting to the database ${error.message}`);
  }
};


