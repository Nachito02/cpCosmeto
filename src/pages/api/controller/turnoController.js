import Cliente from "../models/Cliente";
import Horarios from "../models/Horarios";
import Servicio from "../models/Servicio";
import Turno from "../models/Turno";
import TurnoManual from "../models/TurnoManual";

export const isAvailableHour = async (req) => {
  const horarios = await Horarios.find();

  const { date } = req;

  const horariosReservados = await Turno.find({ fecha: date });

  const availableHours = horarios.filter((horario) => {
    return !horariosReservados.some((turno) =>
      turno.horario.equals(horario._id)
    );
  });

  return availableHours;
};

export const handleReservation = async (req) => {
  const {
    emailClient,
    nameService,
    date,
    hours,
    studio,
    professional,
    number,
  } = req.body;

  const client = await Cliente.findOne({ correo: emailClient });
  const service = await Servicio.findOne({ nombre: nameService });

  const exist = await Turno.findOne({ fecha: date, horario: hours });

  if (exist) {
    throw new Error("Ya existe turno en la fecha y en el horario seleccionado");
  }

  const newTurno = await Turno.create({
    id_cliente: client._id,
    id_servicio: service._id,
    id_profesional: professional,
    fecha: date,
    horario: hours,
    estudio: studio,
    estado: "pendiente",
  });

  if (number) {
    const updateCLiente = await Cliente.findById(client._id);

    updateCLiente.number = number;

    await updateCLiente.save();

    console.log(updateCLiente);
  }

  return newTurno._id;
};

export const getTurnos = async () => {
  const manualTurnos = await TurnoManual.find();

  const turnos = await Turno.find()
    .populate("id_servicio", "nombre precio")
    .populate("id_cliente", "nombre correo apellido")
    .populate("horario", "horario");

  return turnos;
};

export const getTurno = async (id) => {
  const turnos = await Turno.findById(id)
    .populate("id_servicio", "nombre precio")
    .populate("id_cliente", "nombre correo apellido")
    .populate("horario", "horario")
    .populate("id_profesional", "nombre apellido");

  return turnos;
};

export const updateStatus = async (id) => {
  const turno = await Turno.findById(id);

  turno.estado = "confirmado";

  await turno.save();

  return "Actualizado correctamente";
};

export const addTurnoManual = async (body) => {
  const turno = await TurnoManual.create(body);

  return turno;
};


export const getManualTurno = async () => {
  const turnos = await TurnoManual.find()

  return turnos;
};