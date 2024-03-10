import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  friends: [
    {
      name: { type: String },
      email: { type: String },
      id: { type: String },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  title: {
    type: String,
    default: "Novice",
  },
  badges: {
    type: String,
  },
  rating: {
    type: Number,
    default: null,
  },
  otp: {
    type: String,
    default: null,
  },
  notifications: [
    {
      title: {
        type: String,
      },
      isRead: {
        type: Boolean,
      },
      info: {
        type: Object,
      },
    },
  ],
});

const User = mongoose.model("innov_user", userSchema);
export default User;
