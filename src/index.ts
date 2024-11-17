import "dotenv/config";
import "module-alias/register";
import { validateEnv } from "@/lib/validate-env";
import App from "@/app";
import ProductsController from "@/controllers/products.controller";

validateEnv();

const app = new App([new ProductsController()], Number(process.env.PORT));

app.listen();
