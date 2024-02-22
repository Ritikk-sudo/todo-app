import { timeStamp } from "console";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
