// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Categoria from "../models/Categoria";
import Servicio from "../models/Servicio";

const services = [
  {
    nombre: "Spa de pies",
    descripcion: "Exfoliación y remocion de durezas en conjunto con spa relajante y humectacion",
    precio: 4000,
    tiempo_estimado: "1 hora",
  },
  {
    nombre: "Spa Jelly",
    descripcion:
      "Jelly spa, rejuvenecedor de pies.",
    precio: 5000,
    tiempo_estimado: "1 hora",
  },
  {
    nombre: "Spa de fango",
    descripcion:
      "Exfoliación y remocion de durezas en conjunto con spa de fango para pies cansados y humectacion",
    precio: 4500,
    tiempo_estimado: "1 hora",
  },
];

export default async function handler(req, res) {
  try {
    const category = await Categoria.findOne({ nombre: "Podoestetica" });
    if (!category) {
      return res.status("404").json("No se encontro ninguna categoria");
    }
    for (const service of services) {
      const existService = await Servicio.findOne({ nombre: service.nombre });
      if (existService) {
        console.log("ya existe");
      } else {
        const insert = service;
        insert.id_categoria = category._id;
        const newService = await Servicio.create(insert);
        await newService.save();
      }
    }
    res.status(200).json("Categorias agregadas correctamente");
  } catch (error) {
    console.log("error");
    res.status(400).json(error.message);
  }
}
