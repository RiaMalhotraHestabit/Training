import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import logger from "../utils/logger.js";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

export const emailQueue = new Queue("email-queue", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
  },
});
// Start worker ONLY if explicitly enabled
if (process.env.RUN_WORKER === "true") {
  const emailWorker = new Worker(
    "email-queue",
    async (job) => {
      const { to, subject } = job.data;

      logger.info("Sending email", {
        to,
        subject,
        jobId: job.id,
      });

      await new Promise((res) => setTimeout(res, 2000));

      logger.info("Email sent successfully", {
        jobId: job.id,
      });
    },
    { connection }
  );

  emailWorker.on("failed", (job, err) => {
    logger.error("Email job failed", {
      jobId: job.id,
      error: err.message,
    });
  });
  logger.info("Email worker started");
}
