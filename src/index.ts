import "dotenv/config";
import "module-alias/register";
import { validateEnv } from "@/lib/validate-env";
import App from "@/app";
import ProductsController from "@/controllers/products.controller";
import CategoriesController from "@/controllers/categories.controller";

validateEnv();

const app = new App(
  [new ProductsController(), new CategoriesController()],
  Number(process.env.PORT)
);

app.listen();
