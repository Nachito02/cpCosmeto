import Horarios from "../models/Horarios";
import Turno from "../models/Turno";

export const isAvailableHour = async (date) => {
  const horarios = await Horarios.find();

  const horariosReservados = await Turno.find({ fecha: date }).distinct(
    "horario"
  );

  const availableHours = horarios.filter(
    (horario) => !horariosReservados.includes(horario._id.toString())
  );

  return availableHours;
};
