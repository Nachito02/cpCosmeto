import Cliente from "../models/Cliente";
import Horarios from "../models/Horarios";
import Servicio from "../models/Servicio";
import Turno from "../models/Turno";

export const isAvailableHour = async (req) => {
  const horarios = await Horarios.find();

  const { date } = req;

  const horariosReservados = await Turno.find({ fecha: date });

  console.log(horariosReservados);

  const availableHours = horarios.filter((horario) => {
    return !horariosReservados.some((turno) =>
      turno.horario.equals(horario._id)
    );
  });

  return availableHours;
};

export const handleReservation = async (req) => {
  const { emailClient, nameService, date, hours, studio } = req.body;

  console.log(emailClient);
  const client = await Cliente.findOne({ correo: emailClient });
  const service = await Servicio.findOne({ nombre: nameService });

  const exist = await Turno.findOne({ fecha: date, horario: hours });

  console.log(exist);
  if (exist) {
    throw new Error("Ya existe turno en la fecha y en el horario seleccionado");
  }

  const newTurno = await Turno.create({
    id_cliente: client._id,
    id_servicio: service._id,
    fecha: date,
    horario: hours,
    estudio: studio,
    estado: "pendiente",
  });

  console.log(newTurno);

  return "Agregado correctamente";
};

export const getTurnos = async () => {
  const turnos = await Turno.find()
    .populate("id_servicio", "nombre")
    .populate("id_cliente", "nombre correo apellido")
    .populate("horario", "horario");

  return turnos;
};
