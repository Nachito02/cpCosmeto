// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Categoria from "./models/Categoria";
import Servicio from "./models/Servicio";
import {connectDB, disconnectDB} from "./config/db";
export default async function handler(req, res) {
 await connectDB()

  if (req.method === "GET") {
    const { nombre } = req.query;

    try {
      const category = await Categoria.findOne({ nombre });
      if (!category) {
        return res.status(400).json("No existe la categoria seleccionada");
      }
      const services = await Servicio.find({id_categoria:category._id})
      
      res.status(200).json(services)
    } catch (error) {
      res.status(400).json(error.message);
    }

  }

}
