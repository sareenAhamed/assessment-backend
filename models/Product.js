import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
})

export default mongoose.model("products", productSchema);