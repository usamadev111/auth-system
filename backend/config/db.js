import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(`database connected sucessfully`);
  } catch (error) {
    console.error(`database connection failed error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
