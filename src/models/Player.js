// src/models/Player.js
import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  uuid: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  skinURL: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Player || mongoose.model("Player", playerSchema);
