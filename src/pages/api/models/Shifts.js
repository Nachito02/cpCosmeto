import mongoose from "mongoose";

const shiftsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },

    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required:true 
    },

    hour: {
        type: String,
        required: true,
    },

    status: {
        type:String,
        enum :['pendiente', 'confirmado','cancelado','completado' ],
        required: true,
        dafault: 'pendiente'
    }
})

export default mongoose.models.Shift || mongoose.model("Shift", shiftsSchema);
