import mongoose from "mongoose";

const horariosSchema = new mongoose.Schema({
  horario: {
    type : String
  },
});

export default mongoose.models.Horario ||
  mongoose.model("Horario", horariosSchema);
