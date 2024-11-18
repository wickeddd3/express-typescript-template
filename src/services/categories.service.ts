import { CategoriesRepository } from "@/repositories/categories.repository";
import { CategorySchemaType } from "@/schemas/category.schema";
import { Category } from "@prisma/client";

export class CategoriesService {
  private categoriesRepository = new CategoriesRepository();

  public async list(query = {}): Promise<Category[] | Error> {
    try {
      const categories = await this.categoriesRepository.list();
      return categories as Category[];
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
