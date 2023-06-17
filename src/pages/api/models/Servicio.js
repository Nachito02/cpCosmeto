import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({
  id_categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },

  precio: {
    type: Number,
    required: true,
  },

  tiempo_estimado: {
    type: String,
    required: true,
  },

  id_servicio_extra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicio_extra",
  },
});

export default mongoose.models.Servicio ||
  mongoose.model("Servicio", servicioSchema);
