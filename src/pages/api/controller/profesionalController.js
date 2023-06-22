
import Profesional from "../models/Profesional"

export const getProfesionalsPerCategory = async(nombre) => { 

  console.log(nombre)

  const selectProfesional = await Profesional.find().populate('id_categorias',{nombre: nombre})
  .populate('id_categorias');
  console.log(selectProfesional)
   return selectProfesional

 }