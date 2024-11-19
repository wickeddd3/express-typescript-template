import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './swagger/swagger.config';
import Controller from '@/interfaces/controller.interface';
import ErrorMiddleware from '@/middlewares/error.middleware';

export class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
    this.initialiseSwagger();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.configureCors();
    this.express.use(morgan('dev'));
    this.express.use(express.json({ limit: '10mb' }));
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private configureCors(): void {
    const developmentServer = `http://localhost:${process.env.PORT}`;
    const clientApp = process.env.APP_URL;
    const allowedOrigins = [developmentServer, clientApp];

    const corsOptions = {
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow access
        } else {
          callback(new Error('Not allowed by CORS')); // Deny access
        }
      },
      credentials: true, // Include credentials (cookies, authorization headers, etc.)
    };

    this.express.use(cors(corsOptions));
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initialiseSwagger(): void {
    const specs = swaggerJsdoc(swaggerConfig);
    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
