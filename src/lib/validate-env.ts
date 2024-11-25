import { cleanEnv, str, port } from 'envalid';

export const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    PORT: port({ default: 3000 }),
    DATABASE_URL: str(),
    APP_URL: str(),
  });
};
