import { prisma } from '@/lib/prisma';
import { ProductSchemaType } from '@/schemas/product.schema';
import { ListQueryParams } from '@/types/query.type';
import { Product } from '@prisma/client';

export class ProductsRepository {
  private db = prisma;

  public async list(query: ListQueryParams): Promise<Product[] | Error> {
    try {
      const { orderBy, order, size, page } = query;
      const products = await this.db.product.findMany({
        orderBy: { [orderBy]: order },
        include: {
          category: true,
        },
        take: parseInt(size as any),
        skip: parseInt(page as any),
      });
      return products as Product[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async count(): Promise<number> {
    try {
      return await this.db.product.count();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Product | Error> {
    try {
      const product = await this.db.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
      return product as Product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: ProductSchemaType & { slug: string }): Promise<Product | Error> {
    try {
      const product = await this.db.product.create({
        data: { ...data },
      });
      return product as Product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: ProductSchemaType): Promise<Product | Error> {
    try {
      const product = await this.db.product.update({
        where: { id },
        data: {
          ...data,
        },
      });
      return product as Product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.db.product.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
