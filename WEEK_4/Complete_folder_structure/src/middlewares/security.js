import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

export const helmetMiddleware = helmet();

export const corsMiddleware = cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});
