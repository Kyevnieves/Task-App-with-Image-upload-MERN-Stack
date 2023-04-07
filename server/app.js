import express from "express";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.routes.js";
import fileUpload from "express-fileupload";
import { dirname, join } from "path";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

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
app.use(express.static(path.join(__dirname, "../client/build")));
