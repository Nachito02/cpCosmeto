import Shifts from "./models/Shifts";
import connectDB from "./config/db";
export default async function handler(req, res) {
  try {
    await connectDB(); // Llama a la función connectDB para conectar con la base de datos

    const getShift = await Shifts.find().populate("service");
    res.status(200).json(getShift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
}
