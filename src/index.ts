import 'dotenv/config';
import 'module-alias/register';
import { validateEnv } from '@/lib/validate-env';
import { App } from '@/app';
import { AuthController } from '@/controllers/auth.controller';
import { UsersController } from '@/controllers/users.controller';
import { ProductsController } from '@/controllers/products.controller';
import { CategoriesController } from '@/controllers/categories.controller';

validateEnv();

const app = new App(
  [new AuthController(), new UsersController(), new ProductsController(), new CategoriesController()],
  Number(process.env.PORT),
);

app.listen();
