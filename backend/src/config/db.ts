import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
    }

    process.exit(1);
  }
};