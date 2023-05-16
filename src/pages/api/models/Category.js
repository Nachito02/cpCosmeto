import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    description: {
        type:String,
        required: true,
    },

    img_service: {
        type:String,
        require:true,
    }
})

export default mongoose.models.Category || mongoose.model("Category", categorySchema);