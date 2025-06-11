import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config(); 

const app = express();

const allowedOrigin = process.env.NODE_ENV === "production"
  ? "https://gemini-clone-ir95.onrender.com"
  : "http://localhost:5173";

// Middleware
app.use(cors({origin: allowedOrigin,
credentials: true,
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"]}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);


export default app;