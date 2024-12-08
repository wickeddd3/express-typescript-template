import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/interfaces/controller.interface';
import HttpException from '@/exceptions/http.exception';
import { UsersService } from '@/services/users.service';
import { authenticateJwt } from '@/middlewares/token.middleware';
import { LIST_QUERY } from '@/constants/list-query';

export class UsersController implements Controller {
  public path = '/users';
  public router = Router();
  private usersService = new UsersService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
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
     *         description: List of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       500:
     *         description: Server error
     */
    this.router.get(`${this.path}`, [authenticateJwt], this.list);
    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: User ID
     *     responses:
     *       200:
     *         description: User details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: User not found
     */
    this.router.get(`${this.path}/:id`, [authenticateJwt], this.get);
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
      const { data, total } = await this.usersService.list(query);
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

  private get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.usersService.get(parseInt(id));
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
