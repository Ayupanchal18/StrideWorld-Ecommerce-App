import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoDb_URl)
        console.log(`connected to mongoDb database ${conn.connection.host}`);
    } catch (error) {
        console.log(` error in mongoDB ${error}`);
    }
}

export default connectDB;