import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/interfaces/controller.interface";
import HttpException from "@/exceptions/http.exception";
import validationMiddleware from "@/middlewares/validation.middleware";
import { userSchema } from "@/schemas/user.schema";
import { CategoriesService } from "@/services/categories.service";

export class CategoriesController implements Controller {
  public path = "/categories";
  public router = Router();
  private categoriesService = new CategoriesService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    /**
     * @swagger
     * /api/categories:
     *   get:
     *     summary: Get all categories
     *     tags: [Categories]
     *     parameters:
     *       - in: query
     *         name: size
     *         schema:
     *           type: integer
     *         description: Number of items per page
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         description: Page number
     *       - in: query
     *         name: orderBy
     *         schema:
     *           type: string
     *         description: Field to sort by
     *       - in: query
     *         name: order
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *         description: Sort order
     *     responses:
     *       200:
     *         description: List of categories
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Category'
     *       500:
     *         description: Server error
     */
    this.router.get(`${this.path}`, this.list);
    /**
     * @swagger
     * /api/categories:
     *   post:
     *     summary: Create a new category
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Category'
     *     responses:
     *       201:
     *         description: Category created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       400:
     *         description: Invalid input
     */
    this.router.post(`${this.path}`, validationMiddleware(userSchema), this.create);
    /**
     * @swagger
     * /api/categories/{id}:
     *   get:
     *     summary: Get a category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Category ID
     *     responses:
     *       200:
     *         description: Category details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       404:
     *         description: Category not found
     */
    this.router.get(`${this.path}/:id`, this.get);
    /**
     * @swagger
     * /api/categories/{id}:
     *   put:
     *     summary: Update a category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Category ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Category'
     *     responses:
     *       200:
     *         description: Category updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       404:
     *         description: Category not found
     *       400:
     *         description: Invalid input
     */
    this.router.put(`${this.path}/:id`, validationMiddleware(userSchema), this.update);
    /**
     * @swagger
     * /api/categories/{id}:
     *   delete:
     *     summary: Delete a category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Category ID
     *     responses:
     *       200:
     *         description: Category deleted successfully
     *       404:
     *         description: Category not found
     */
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
