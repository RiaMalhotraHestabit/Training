import mongoose from "mongoose";
import logger from "../utils/logger.js";
import config from "../config/index.js";

export default async function dbLoader() {
  try {
    await mongoose.connect(config.dbUrl);

    logger.info(`Database connected at ${config.dbUrl}`);
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1);
  }
}
