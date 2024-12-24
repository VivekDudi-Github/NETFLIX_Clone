import mongoose from 'mongoose'
import {ENV_VARS} from './envVAr.js'


export const connectDB = async() => {
    try {
        const connect = await mongoose.connect(ENV_VARS.MONGODB_URI.trim())
        console.log("mongoDB connected");
        
    } catch (error) {
        console.log("MongoDB connection error" , error);
        process.exit(1)
    }
}