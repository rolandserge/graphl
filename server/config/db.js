import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const { DB_URI } = process.env

const connectDB = async() => {

    try {
        const connexion = await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    
        console.log(`MongoDB connected: ${connexion.connection.host}`.cyan.underline.bold);

    } catch (error) {
         console.error('Error connecting to MongoDB:', error);
    }
}

export default connectDB