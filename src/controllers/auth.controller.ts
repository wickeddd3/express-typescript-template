import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/interfaces/controller.interface';
import HttpException from '@/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import { userSchema } from '@/schemas/user.schema';
import { loginSchema } from '@/schemas/login.schema';
import { UsersService } from '@/services/users.service';

export class AuthController implements Controller {
  public path = '/auth';
  public router = Router();
  private usersService = new UsersService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/register`, validationMiddleware(userSchema), this.register);
    this.router.post(`${this.path}/login`, validationMiddleware(loginSchema), this.login);
  }

  private register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const user = await this.usersService.create({ name, email, password });
      res.status(201).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await this.usersService.authenticate({ email, password });
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
