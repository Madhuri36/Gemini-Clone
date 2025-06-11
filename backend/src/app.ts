import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import appRouter from "./routes/index.js";

config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://gemini-clone-ir95.onrender.com"
];

// CORS setup
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. API routes first
app.use("/api/v1", appRouter);

// 2. Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// 3. For any route that is NOT starting with /api/v1 and NOT a static file, serve index.html
app.get(/^\/(?!api\/v1).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


export default app;
