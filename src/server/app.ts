import express from "express";
import cors from "cors";

import authRoutes from "../routes/authRoutes";
import personRoutes from "../routes/personRoutes";
import ticketRoutes from "../routes/ticketRoutes";
import { db } from "../config/db.config";

const app = express();
const port = process.env.PORT || 3012;

//middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "https://dof-pwa.vercel.app"], // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", personRoutes);
app.use("/api/v1", ticketRoutes);

//db connection then server connection
db.then(() => {
  app.listen(port, () => console.log("Server is listening on port:", port));
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});
