import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  id_turnos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turno",
  },

  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  foto_perfil: {
    type: String,
  },
  fecha_nacimiento: {
    type: Date,
  },
});

export default mongoose.models.Cliente ||
  mongoose.model("Cliente", clienteSchema);
