import mongoose from "mongoose";

const connectMongoDB = async(url) => {
    try {
        await mongoose.connect(url);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectMongoDB;