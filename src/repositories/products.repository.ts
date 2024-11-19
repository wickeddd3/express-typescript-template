import { prisma } from '@/lib/prisma';
import { ProductSchemaType } from '@/schemas/product.schema';
import { LIST_QUERY } from '@/constants/list-query';
import { ListQueryParams } from '@/types/query.type';
import { Product } from '@prisma/client';

export class ProductsRepository {
  private db = prisma;

  public async list(query = LIST_QUERY): Promise<Product[] | Error> {
    try {
      const { orderBy, order, take, skip } = query as ListQueryParams;
      const products = await this.db.product.findMany({
        orderBy: { [orderBy]: order },
        include: {
          category: true,
        },
        take,
        skip,
      });
      return products as Product[];
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

  public async create(data: ProductSchemaType): Promise<Product | Error> {
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
