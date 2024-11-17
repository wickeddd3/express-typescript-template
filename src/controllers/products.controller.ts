import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/interfaces/controller.interface";
import HttpException from "@/exceptions/http.exception";
import validationMiddleware from "@/middlewares/validation.middleware";
import { userSchema } from "@/schemas/user.schema";
import { ProductsService } from "@/services/products.service";

class ProductsController implements Controller {
  public path = "/products";
  public router = Router();
  private productsService = new ProductsService();

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
      const products = await this.productsService.list(query);
      res.status(200).json(products);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      const product = await this.productsService.create(data);
      res.status(201).json(product);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productsService.get(parseInt(id));
      res.status(200).json(product);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
      const product = await this.productsService.update(parseInt(id), data);
      res.status(200).json(product);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productsService.delete(parseInt(id));
      res.status(200).json(product);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default ProductsController;
