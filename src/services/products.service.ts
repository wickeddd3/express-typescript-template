import { ProductsRepository } from '@/repositories/products.repository';
import { ProductSchemaType } from '@/schemas/product.schema';
import { Product } from '@prisma/client';

export class ProductsService {
  private productsRepository = new ProductsRepository();

  public async list(query = {}): Promise<Product[] | Error> {
    try {
      const products = await this.productsRepository.list();
      return products as Product[];
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
      const product = await this.productsRepository.create(data);
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
