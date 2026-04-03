import express from "express";
import connectDB from "./db.js";
import logger from "../utils/logger.js";
import tracing from "../utils/tracing.js";

import userRoutes from "../routes/user.routes.js";
import productRoutes from "../routes/product.routes.js";

import {
  helmetMiddleware,
  corsMiddleware,
  rateLimiter,
} from "../middlewares/security.js";

import { errorMiddleware } from "../middlewares/error.middleware.js";
import requestLogger from "../middlewares/requestLogger.middleware.js";

export default async function createApp() {
  const app = express();

  /* 1️⃣ SECURITY */
  app.use(helmetMiddleware);
  app.use(corsMiddleware);

  /* 2️⃣ BODY PARSER */
  app.use(express.json({ limit: "10kb" }));

  /* 3️⃣ TRACING + LOGGING (DAY-5) */
  app.use(tracing);
  app.use(requestLogger);

  /* 4️⃣ RATE LIMITING */
  app.use(rateLimiter);

  logger.info("Security, tracing & core middlewares loaded");

  /* 5️⃣ DATABASE */
  await connectDB();
  logger.info("Database connected");

  /* 6️⃣ ROUTES */
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  logger.info("Routes mounted");

  /* 7️⃣ ERROR HANDLER (ALWAYS LAST) */
  app.use(errorMiddleware);

  logger.info("App bootstrapped successfully");

  return app;
}
