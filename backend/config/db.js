import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/Khaopio`);
        console.log(`\n DB Connected ! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error " , error)
        process.exit(1)
    }
}

export default connectDB;