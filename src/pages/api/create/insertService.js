// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../config/db";
import Category from "../models/Category";
import Service from "../models/Service";

const services = [
  {
    name: "Limpieza facial profunda",
    description:
      "Higiene de la piel con extracciones, mascarilla, masajes y humectación + protección",
    price: 3500,
  },

  {
    name: "Limpieza pemium",
    description: "Limpieza profunda en cuello y escote",
    price: 4000,
  },

  {
    name: "Velo de Colageno",
    description:
      "Tratamiento anti-edad regenera colageno y elastina dando un aspecto rejuvenecido",
    price: 3800,
  },

  {
    name: "Peeling con AHA's",
    description:
      "Elimina manchas y cicatrices, atenua arrugas y seborregula zonas grasas.",
    price: 4000,
  },

  {
    name: "Tratamiento ACNE",
    description:
      "Tratamiento perzonalizado para acne hormonal, bacteriano y inflamatorio",
    price: 4500,
  },

  {
    name: "Dermaplaning",
    description:
      "Limpieza profunda con exfoliación mecanica con bisturi grado medico, elimina vellos indeseados",
    price: 4000,
  },

  {
    name: "Aparatología",
    description:
      " Limpieza facial con Punta de diamante o Espatula ultrasonica",
    price: 3500,
  },
];

export default async function handler(req, res) {
  connectDB();
  try {
    const category = await Category.findOne({ name: "Cosmetologia" });
    if (!category) {
        return res.status('404').json('No se encontro ninguna categoria')
      } 
    for (const service of services) {
 
        const existService = await Service.findOne({name: service.name})
            if(existService) {
                console.log('ya existe')
            } else {
                const insert = service;

                insert.category = category._id;
                const newService = await  Service.create(insert);
                await newService.save();
            }
       
    }

    res.status(200).json("Categorias agregadas correctamente");
  } catch (error) {
    console.log("error");
    res.status(400).json(error.message);
  }
}
