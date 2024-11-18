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
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Product ID",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Product creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Product last update timestamp",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            slug: {
              type: "string",
              description: "Product slug (unique identifier)",
            },
            price: {
              type: "number",
              format: "decimal",
              description: "Product price",
            },
            categoryId: {
              type: "integer",
              description: "Category ID the product belongs to",
            },
          },
          required: ["name", "slug", "price", "categoryId"],
        },
        Category: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Category ID",
            },
            name: {
              type: "string",
              description: "Category name",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Category creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Category last update timestamp",
            },
          },
          required: ["name"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export default swaggerOptions;
