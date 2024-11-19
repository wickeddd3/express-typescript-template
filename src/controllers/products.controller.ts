import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/interfaces/controller.interface';
import HttpException from '@/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import { productSchema } from '@/schemas/product.schema';
import { ProductsService } from '@/services/products.service';

export class ProductsController implements Controller {
  public path = '/products';
  public router = Router();
  private productsService = new ProductsService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    /**
     * @swagger
     * /api/products:
     *   get:
     *     summary: Get all products
     *     tags: [Products]
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
     *         description: List of products
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       500:
     *         description: Server error
     */
    this.router.get(`${this.path}`, this.list);
    /**
     * @swagger
     * /api/products:
     *   post:
     *     summary: Create a new product
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       201:
     *         description: Product created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       400:
     *         description: Invalid input
     */
    this.router.post(`${this.path}`, validationMiddleware(productSchema), this.create);
    /**
     * @swagger
     * /api/products/{id}:
     *   get:
     *     summary: Get a product by ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Product ID
     *     responses:
     *       200:
     *         description: Product details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       404:
     *         description: Product not found
     */
    this.router.get(`${this.path}/:id`, this.get);
    /**
     * @swagger
     * /api/products/{id}:
     *   put:
     *     summary: Update a product by ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Product ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       200:
     *         description: Product updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       404:
     *         description: Product not found
     *       400:
     *         description: Invalid input
     */
    this.router.put(`${this.path}/:id`, validationMiddleware(productSchema), this.update);
    /**
     * @swagger
     * /api/products/{id}:
     *   delete:
     *     summary: Delete a product by ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Product ID
     *     responses:
     *       200:
     *         description: Product deleted successfully
     *       404:
     *         description: Product not found
     */
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { size, page, orderyBy, order } = req.query;
      const query = {
        take: size || 10,
        skip: page || 0,
        orderBy: orderyBy || 'createdAt',
        order: order || 'desc',
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
