export const localApp = `http://localhost:${process.env.PORT}`;
export const productionApp = process.env.APP_URL;
export const allowedOrigins = process.env.NODE_ENV === 'production' ? [productionApp] : [localApp, productionApp];
