import express from "express";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.routes.js";
export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

// IMPORTANDO RUTAS DE POST
import morgan from "morgan";

// USANDO RUTAS DE POST
app.use(postRoutes);
