// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Estudio from "../models/Estudio";

export default async function handler(req, res) {
  const estudios = [
    {
      nombre: "@solsilmanstudio",
      direccion: "San José 1588, Caseros",
      foto: '/assets/estudios/solsilman.jpg'

    },

    {
      nombre: "@colomba.ok",
      direccion: "Av boulevard San Martín 2959, Ciudad Jardín",
      foto: '/assets/estudios/colombaok.jpg'
    },
  ];

  try {
      for(const estudio of estudios) {
        const existing = await Estudio.findOne({
          nombre: estudio.nombre
        })

        if(existing) {
          console.log('ya existe')
        } else {
          await Estudio.create(estudio)
        }
      }
      res.status(200).json("Estudios agregados correctamente");
  } catch (error) {
    res.status(404).json("Error al agregar");

    console.log(error);
  }
}
