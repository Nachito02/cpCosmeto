import mongoose from "mongoose";

const turnosSchema = new mongoose.Schema({
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  id_servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicio",
    required: true,
  },
  fecha: {
    type: Date,
    ref: "Service",
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

export default mongoose.models.Turno || mongoose.model("Turno", turnosSchema);
