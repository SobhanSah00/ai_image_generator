import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    githubId: { type: String, unique: true, sparse: true }, // ✅ Now allows multiple null values
    googleId: { type: String, unique: true, sparse: true }, // ✅ Now allows multiple null values
    imageGenerationCount: { type: Number, default: 5 },
    isSubscribed: { type: Boolean, default: false }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
