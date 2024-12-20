import { prisma } from '@/lib/prisma';
import { UserSchemaType } from '@/schemas/user.schema';
import { ListQueryParams } from '@/types/query.type';
import { excludeFields } from '@/utils/data-transformers';
import { User } from '@prisma/client';

export class UsersRepository {
  private db = prisma;

  public async list(query: ListQueryParams): Promise<Partial<User>[] | Error> {
    try {
      const { orderBy, order, size, page } = query;
      const data = await this.db.user.findMany({
        orderBy: { [orderBy]: order },
        take: parseInt(size as any),
        skip: parseInt(page as any),
      });
      const users = excludeFields(data, ['password']);
      return users as Partial<User>[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async count(): Promise<number> {
    try {
      return await this.db.user.count();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Partial<User>> {
    try {
      const data = await this.db.user.findUnique({
        where: { id },
      });
      const user = excludeFields(data, ['password']);
      return user as Partial<User>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
      });
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: UserSchemaType): Promise<User> {
    try {
      const user = await this.db.user.create({
        data: { ...data },
      });
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: UserSchemaType): Promise<User | Error> {
    try {
      const user = await this.db.user.update({
        where: { id },
        data: {
          ...data,
        },
      });
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.db.user.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
