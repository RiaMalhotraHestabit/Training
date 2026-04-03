import appLoader from "./loaders/app.js";
import config from "./config/index.js";
import logger from "./utils/logger.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

async function startServer() {
  const app = await appLoader();

  // API Documentation
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port}`);
  });
}

startServer();
