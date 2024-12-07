import { prisma } from '@/lib/prisma';
import { CategorySchemaType } from '@/schemas/category.schema';
import { ListQueryParams } from '@/types/query.type';
import { Category } from '@prisma/client';

export class CategoriesRepository {
  private db = prisma;

  public async list(query: ListQueryParams): Promise<Category[] | Error> {
    try {
      const { orderBy, order, size, page } = query;
      const categories = await this.db.category.findMany({
        orderBy: { [orderBy]: order },
        take: parseInt(size as any),
        skip: parseInt(page as any),
      });
      return categories as Category[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async count(): Promise<number> {
    try {
      return await this.db.category.count();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Category | Error> {
    try {
      const category = await this.db.category.findUnique({
        where: { id },
      });
      return category as Category;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: CategorySchemaType): Promise<Category | Error> {
    try {
      const category = await this.db.category.create({
        data: { ...data },
      });
      return category as Category;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: CategorySchemaType): Promise<Category | Error> {
    try {
      const category = await this.db.category.update({
        where: { id },
        data: {
          ...data,
        },
      });
      return category as Category;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.db.category.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
