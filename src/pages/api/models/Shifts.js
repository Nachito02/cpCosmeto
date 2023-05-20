import mongoose from "mongoose";

const shiftsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type:Number,
        required:true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required:true 
    },
    date: {
        type: Date,
        required: 'true'
    },
    hour: {
        type: String,
        required: true,
    },

    status: {
        type:String,
        enum :['pendiente', 'confirmado','cancelado','completado' ],
        dafault: 'pendiente',
        required:true
    }
})

export default mongoose.models.Shift || mongoose.model("Shift", shiftsSchema);
