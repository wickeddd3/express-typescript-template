import { CategoriesRepository } from '@/repositories/categories.repository';
import { CategorySchemaType } from '@/schemas/category.schema';
import { ListQueryParams } from '@/types/query.type';
import { Category } from '@prisma/client';

export class CategoriesService {
  private categoriesRepository = new CategoriesRepository();

  public async list(query: ListQueryParams): Promise<{ data: Category[] | Error; total: number }> {
    try {
      const data = await this.categoriesRepository.list(query);
      const total = await this.categoriesRepository.count();
      return { data, total };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Category | Error> {
    try {
      const category = await this.categoriesRepository.get(id);
      return category as Category;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: CategorySchemaType): Promise<Category | Error> {
    try {
      const category = await this.categoriesRepository.create(data);
      return category as Category;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: CategorySchemaType): Promise<Category | Error> {
    try {
      const category = await this.categoriesRepository.update(id, data);
      return category as Category;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.categoriesRepository.delete(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
