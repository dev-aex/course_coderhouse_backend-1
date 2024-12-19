import { connect, Types } from "mongoose";
import ErrorManager from "../managers/ErrorManager.js";

const connectDB = async () => {
  const URL =
    "mongodb+srv://antonioaestrella:clavebackend1@backend1.qkwu0.mongodb.net/alexguitars";

  try {
    await connect(URL);
  } catch (err) {
    console.log("Error conectando", err);
    throw new ErrorManager("Unable to connect Mongoose", 500);
  }
};

const isValidId = (id) => {
  return Types.ObjectId.isValid(id);
};

export { connectDB, isValidId };
