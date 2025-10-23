import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true,
    trim: true
  },
  kills: {
    type: Number,
    default: 0
  },
  deaths: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.Stats || mongoose.model("Stats", statsSchema);
