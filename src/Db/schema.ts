import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WinnerSchema = new Schema({
  name: String,
  image: String,
  email: {
    type:String,
    unique:true},
  moves: Number,
  gameMode: String,
  timeTaken: Number
});

export const Winner = mongoose.models.winners || mongoose.model("winners", WinnerSchema)