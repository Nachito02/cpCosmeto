import mongoose from "mongoose";

const connectDB = async () => {
   
        try {
            const connection = await mongoose.connect(process.env.MONGO_URI,{});

            const url = `${connection.connection.host} : ${connection.connection.port}`
        
        
            console.log(`MongoDB conectado en ${url}`)
        } catch (error) {
            console.log(error)
        }
}

export default connectDB
