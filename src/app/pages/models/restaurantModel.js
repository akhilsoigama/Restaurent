import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    mobile: { type: String, required: true },
    gender: { type: String, required: true },
}, );

export const Restaurant = mongoose.models.items || mongoose.model("items", restaurantSchema);
