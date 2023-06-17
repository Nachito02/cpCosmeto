import mongoose from "mongoose";

const servicioExtraSchema = new mongoose.Schema({
  id_servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicio",
    required: true,
  },

  tiempo_agregado: {
    type: Number,
  },


});

export default mongoose.models.Servicio_extra ||
  mongoose.model("Servicio_extra", servicioExtraSchema);
