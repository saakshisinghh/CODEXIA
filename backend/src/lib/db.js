import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        if(!ENV.DB_URL){
            throw new Error("DB_URL IS NOT DEFINED IN ENV VARIABLE");
        }
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("✅ CONNECTED TO MONGODB:" , conn.connection.host);
        
    } catch (error) {
        console.log("❌ ERROR CONNECTING TO DB" ,error);
        process.exit(1); 
        
    }
}