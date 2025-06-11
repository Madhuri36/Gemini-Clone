import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

config(); // Load .env

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://gemini-clone-ir95.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// API routes
app.use("/api/v1", appRouter);

// === Serve frontend in production ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Catch-all to support React Router on refresh
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

export default app;
