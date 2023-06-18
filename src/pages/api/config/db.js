import mongoose from "mongoose";

let dbConnection = null;

const connectDB = async () => {
  try {
    if (!dbConnection) {
      dbConnection = await mongoose.connect(process.env.MONGO_URI, {});
      const url = `${dbConnection.connection.host}:${dbConnection.connection.port}`;
      console.log(`MongoDB conectado en ${url}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const disconnectDB = async () => {
  try {
    if (dbConnection) {
      await mongoose.disconnect();
      console.log("Desconexión exitosa de MongoDB");
      dbConnection = null;
    }
  } catch (error) {
    console.log(error);
  }
};

export { connectDB, disconnectDB };
