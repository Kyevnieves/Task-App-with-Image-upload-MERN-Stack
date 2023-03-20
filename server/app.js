import express from "express";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.routes.js";
import fileUpload from "express-fileupload";
export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
// IMPORTANDO RUTAS DE POST
import morgan from "morgan";

// USANDO RUTAS DE POST
app.use(postRoutes);
