import mongoose from "mongoose";

const connectDB = async () => {
  try {
 
     mongoose.connect(process.env.MONGODB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
