import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/Stickywall`);
        console.log('MongoDB Connected');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
 
