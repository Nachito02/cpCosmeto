
import Profesional from "../models/Profesional"

export const getProfesionalsPerCategory = async(nombre) => { 


  const selectProfesional = await Profesional.find().populate('id_categorias',{nombre: nombre})
  .populate('id_categorias');
   return selectProfesional

 }