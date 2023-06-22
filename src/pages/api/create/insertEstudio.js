// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Estudio from "../models/Estudio";

export default async function handler(req, res) {
  try {
     const estudio = await Estudio.create({
        nombre: "Camila",
        direccion: "Pereira",
       
      });

      

    
  } catch (error) {
    res.status(404).json('Error al agregar')

    console.log(error);
  }
}
