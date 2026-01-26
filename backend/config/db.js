import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MongoDB_URL)
        console.log("DataBase connected");
    }
    catch(err){
        console.log("Database connection failed", err);
    }
}