import { Options } from "swagger-jsdoc";

const developmentServer = `http://localhost:${process.env.PORT}`;
const clientApp = process.env.APP_URL;

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express TypeScript API",
      version: "1.0.0",
      description: "API documentation for the Express TypeScript application",
    },
    servers: [
      {
        url: developmentServer,
        description: "Development server",
      },
      {
        url: clientApp,
        description: "Development app",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export default swaggerOptions;
