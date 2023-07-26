import Horarios from "../models/Horarios"
import Turno from "../models/Turno"

export const isAvailableHour = async (turno) => { 


    const horarios = await Horarios.find()


    return horarios


 }