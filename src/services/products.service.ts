import { ProductsRepository } from '@/repositories/products.repository';
import { ProductSchemaType } from '@/schemas/product.schema';
import { ListQueryParams } from '@/types/query.type';
import { createSlug } from '@/utils/slug';
import { Product } from '@prisma/client';

export class ProductsService {
  private productsRepository = new ProductsRepository();

  public async list(query: ListQueryParams): Promise<{ data: Product[] | Error; total: number }> {
    try {
      const data = await this.productsRepository.list(query);
      const total = await this.productsRepository.count();
      return { data, total };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Product | Error> {
    try {
      const product = await this.productsRepository.get(id);
      return product as Product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: ProductSchemaType): Promise<Product | Error> {
    try {
      const productWithSlug = { ...data, slug: createSlug(data.name) };
      const product = await this.productsRepository.create(productWithSlug);
      return product as Product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: ProductSchemaType): Promise<Product | Error> {
    try {
      const product = await this.productsRepository.update(id, data);
      return product as Product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.productsRepository.delete(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
