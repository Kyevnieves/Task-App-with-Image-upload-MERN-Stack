import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connectDB = mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "TaskApp_MERN_DB",
  })
  .then((db) => console.log("Database is connected in", db.connection.name))
  .catch((err) => console.log(err));
