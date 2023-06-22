import mongoose from "mongoose";

const Profesional = new mongoose.Schema({
  id_turnos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turno",
  },

  id_categorias : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
  }],

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
    unique: true,
  },
  password: {
    type: String,
  },
  foto_perfil: {
    type: String,
  },
  
});

export default mongoose.models.Profesional ||
  mongoose.model("Profesional", Profesional);
