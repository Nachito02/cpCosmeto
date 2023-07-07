// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Category from "../models/Categoria";
import Horarios from "../models/Horarios";

const horarios = [
  
    {horario: "8:00"},
    {horario: "9:00"},
    {horario: "10:00"},
    {horario: "11:00"},
    {horario: "12:00"},
    {horario: "13:00"},    
    {horario: "14:00"},
    {horario: "15:00"},
    {horario: "16:00"},
    {horario: "17:00"},
    {horario: "18:00"},

];

export default async function handler(req, res) {
  try {
    for (const horario of horarios) {
      const existHorario = await Horarios.findOne({ horario: horario.horario });
      if (!existHorario) {
        await Category.create(horario);
      }
    }
    
    res.status(200).json("Horarios agregados correctamente");
  } catch (error) {
    console.log("error");
    res.status(400).json(error.message);
  }
}
