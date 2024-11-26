import { prisma } from '@/lib/prisma';
import { UserSchemaType } from '@/schemas/user.schema';
import { LIST_QUERY } from '@/constants/list-query';
import { ListQueryParams } from '@/types/query.type';
import { User } from '@prisma/client';

export class UsersRepository {
  private db = prisma;

  public async list(query = LIST_QUERY): Promise<User[] | Error> {
    try {
      const { orderBy, order, take, skip } = query as ListQueryParams;
      const users = await this.db.user.findMany({
        orderBy: { [orderBy]: order },
        take,
        skip,
      });
      return users as User[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<User | Error> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
      });
      return user as User;
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
