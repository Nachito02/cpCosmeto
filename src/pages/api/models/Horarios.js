import mongoose from "mongoose";

const horariosSchema = new mongoose.Schema({
  horario: {
    type : Date
  },
  fecha: {
    type: Date,
  },


});

export default mongoose.models.Horario ||
  mongoose.model("Horario", horariosSchema);
