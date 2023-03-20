import { app } from "./app.js";
import { connectDB } from "./database.js";
import { PORT } from "./config.js";
app.listen(PORT);
console.log("Server on port", PORT);
