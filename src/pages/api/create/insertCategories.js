// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../config/db";
import Category from "../models/Category";

const services = [
  {
    name: "Depilacion Definitiva",
    description:
      "La depilación definitiva, también conocida como depilación láser o depilación con luz pulsada intensa (IPL), es un método para eliminar el vello no deseado de forma permanente o a largo plazo. A diferencia de la depilación temporal, como el afeitado o la depilación con cera, la depilación definitiva apunta a los folículos pilosos para inhibir o destruir su capacidad de producir vello.",
      img_service : '/assets/categorias/definitiva.jpg'
  },
 
];

export default async function handler(req, res) {
  connectDB();
  try {
      
        for(const service of services) {
            const services = await Category.findOne({name: service.name});
            if(!services)  {
                await Category.create(service)
            }
        }

    res.status(200).json('Categorias agregadas correctamente');
  } catch (error) {
    console.log("error");
    res.status(400).json(error.message);
  }
}
