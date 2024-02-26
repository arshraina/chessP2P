import mongoose from "mongoose";

const gamingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: 50,
  },
  exp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  maxExp: {
    type: Number,
    default: 100,
  },
});

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
  gaming: {
    type: gamingSchema,
    default: {
      rating: 50,
      exp: 0,
      level: 1,
      maxHealth: 50,
      maxExp: 100,
    },
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

const User = mongoose.model("innov_user",userSchema);
export default User;
