import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/interfaces/controller.interface";
import HttpException from "@/exceptions/http.exception";
import validationMiddleware from "@/middlewares/validation.middleware";
import { userSchema } from "@/schemas/user.schema";
import { CategoriesService } from "@/services/categories.service";

class CategoriesController implements Controller {
  public path = "/categories";
  public router = Router();
  private categoriesService = new CategoriesService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.list);
    this.router.post(`${this.path}`, validationMiddleware(userSchema), this.create);
    this.router.get(`${this.path}/:id`, this.get);
    this.router.put(`${this.path}/:id`, validationMiddleware(userSchema), this.update);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { size, page, orderyBy, order } = req.query;
      const query = {
        take: size || 10,
        skip: page || 0,
        orderBy: orderyBy || "createdAt",
        order: order || "desc",
      };
      const categories = await this.categoriesService.list(query);
      res.status(200).json(categories);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      const category = await this.categoriesService.create(data);
      res.status(201).json(category);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const category = await this.categoriesService.get(parseInt(id));
      res.status(200).json(category);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
      const category = await this.categoriesService.update(parseInt(id), data);
      res.status(200).json(category);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const category = await this.categoriesService.delete(parseInt(id));
      res.status(200).json(category);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default CategoriesController;
