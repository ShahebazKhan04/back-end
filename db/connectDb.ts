import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/TBCURD");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error while connecting DB:", error);
  }
};

export default connectDb;