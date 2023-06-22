// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Categoria from "../models/Categoria";
import Profesional from "../models/Profesional";



export default async function handler(req, res) {
  try {
    // const newProfessional = await Profesional.create({
    //     nombre: "Camila",
    //     apellido: "Pereira",
    //     foto_perfil: "/assets/logo.png",
    //     correo: "camilapereira2310@outlook.com",
    //   });

    //const categories = await Categoria.find();

    // const categoriesIds = categories.map((categories) => categories._id);

    // console.log(newProfessional)

    // newProfessional.id_categorias = categoriesIds;


    // res.status(200).json('agregado correctamente')
    // await newProfessional.save();

    // const professionals = await Profesional.find({id_categorias : '648cd2ed326735a0c8be4360'})
    // res.status(200).json(professionals)
    
  } catch (error) {
    res.status(404).json('Error al agregar')

    console.log(error);
  }
}
