import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/interfaces/controller.interface';
import HttpException from '@/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import { categorySchema } from '@/schemas/category.schema';
import { CategoriesService } from '@/services/categories.service';
import { authenticateJwt } from '@/middlewares/token.middleware';
import { LIST_QUERY } from '@/constants/list-query';

export class CategoriesController implements Controller {
  public path = '/categories';
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
    this.router.get(`${this.path}`, [authenticateJwt], this.list);
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
    this.router.post(`${this.path}`, [authenticateJwt, validationMiddleware(categorySchema)], this.create);
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
    this.router.get(`${this.path}/:id`, [authenticateJwt], this.get);
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
    this.router.put(`${this.path}/:id`, [authenticateJwt, validationMiddleware(categorySchema)], this.update);
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
    this.router.delete(`${this.path}/:id`, [authenticateJwt], this.delete);
  }

  private list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { size = 10, page = 1, orderBy = 'createdAt', order = 'desc' } = req.query;
      const pageSize = parseInt(size as string, 10);
      const pageNumber = parseInt(page as string, 10) - 1;
      const query = {
        ...LIST_QUERY,
        size: pageSize,
        page: pageNumber * pageSize,
        orderBy: orderBy as string,
        order: order as 'asc' | 'desc',
      };
      const { data, total } = await this.categoriesService.list(query);
      res.status(200).json({
        data,
        meta: {
          total,
          page: parseInt(page as string, 10),
          size: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      });
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
