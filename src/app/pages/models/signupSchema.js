import mongoose from "mongoose";

const googleSignUpModel = new mongoose.Schema({
  email: { type: String, required: true, unique: true, },
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  profilePicture: { type: String, required: true, },
},);

export const GoogleUser = mongoose.models.googles || mongoose.model("googles", googleSignUpModel);

