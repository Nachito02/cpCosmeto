import Shifts from "./models/Turno";
export default async function handler(req, res) {
  try {

    const getShift = await Shifts.find().populate("service");
    res.status(200).json(getShift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
}
