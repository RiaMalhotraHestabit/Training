import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Week-4 API",
      version: "1.0.0",
      description: "API documentation for Users and Products endpoints",
    },
  },
  apis: [path.join(process.cwd(), "src/routes/*.js")], // <- resolves absolute path
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
