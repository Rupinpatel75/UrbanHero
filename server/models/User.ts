import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    state: {type: String, required: true},
    district: {type: String, required: true},
    city: {type: String, required: true},
    phone_no: {type: Number, required: true}
});

export const User = mongoose.model("User", userSchema);
