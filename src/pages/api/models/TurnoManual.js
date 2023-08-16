import mongoose from "mongoose";

const turnoManualSchema = new mongoose.Schema({
  id_servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicio",
    required: true,
  },

  id_profesional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profesional",
    required: true,
  },

  nombre: {
    type: String,
    required: true,
  },

  fecha: {
    type: Date,

    required: true,
  },
  horario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Horario",
    required: true,
  },
  estudio: {
    type: String,
    required: true,
  },

  estado: {
    type: String,
    enum: ["pendiente", "confirmado", "cancelado", "completado"],
    dafault: "pendiente",
    required: true,
  },
});

export default mongoose.models.TurnoManual ||
  mongoose.model("TurnoManual", turnoManualSchema);
