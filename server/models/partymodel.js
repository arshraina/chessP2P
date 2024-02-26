import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
  partyName: {
    type: String,
  },
  desc: {
    type: String,
  },
  opp: {
    name: {
      type: String,
    },
    health: {
      type: Number,
    },
    attack: {
      type: Number,
    },
    image: {
      type: String,
    },
    maxHealth: {
      type: Number,
    },
  },
  isFighting: {
    type: Boolean,
  },
  logs: [String],
});

const Party = mongoose.model("Party", partySchema);

export default Party;
