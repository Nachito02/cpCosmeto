import mongoose from "mongoose";

const estudioSchema = new mongoose.Schema({
  id_turno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turno",
  },
  nombre: {
    type:String,
    required:true
  },
  direccion: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Estudio ||
  mongoose.model("Estudio", estudioSchema);
