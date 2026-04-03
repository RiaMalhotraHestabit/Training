import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  logger.info("Incoming request", {
    method: req.method,
    url: req.originalUrl,
    requestId: req.requestId,
  });

  next();
};

export default requestLogger;
