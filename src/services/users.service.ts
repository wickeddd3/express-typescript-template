import { hashPassword, isPasswordValid } from '@/lib/bcrypt';
import { generateToken } from '@/lib/jwt';
import { UsersRepository } from '@/repositories/users.repository';
import { LoginSchemaType } from '@/schemas/login.schema';
import { UserSchemaType } from '@/schemas/user.schema';
import { AuthUser } from '@/types/user.type';
import { ListQueryParams } from '@/types/query.type';
import { User } from '@prisma/client';
import { excludeFields } from '@/utils/data-transformers';

export class UsersService {
  private usersRepository = new UsersRepository();

  public async authenticate(data: LoginSchemaType): Promise<AuthUser | Error> {
    try {
      const { email, password } = data;

      // Check if user exist
      const user = await this.usersRepository.getByEmail(email);
      // Throw error if user doesn't exist or if password doesn't match to existing user password
      if (!user || !(await isPasswordValid(password, user.password))) {
        throw new Error('Invalid email or password');
      }

      // Generate jwt token using user id and email
      const token = generateToken(user.id, user.email);

      const authUser = {
        user: excludeFields(user, ['password']),
        token,
      };

      return authUser as AuthUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async list(query: ListQueryParams): Promise<{ data: Partial<User>[] | Error; total: number }> {
    try {
      const data = await this.usersRepository.list(query);
      const total = await this.usersRepository.count();
      return { data, total };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<User | Error> {
    try {
      const user = await this.usersRepository.get(id);
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getByEmail(email: string): Promise<User | Error> {
    try {
      const user = await this.usersRepository.getByEmail(email);
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: UserSchemaType): Promise<AuthUser | Error> {
    try {
      const { name, email, password } = data;

      // Check if email already exist
      const isEmailExist = await this.usersRepository.getByEmail(email);
      if (isEmailExist) {
        throw new Error('Email already exist');
      }

      // If email doesn't exist hash password string and create user
      const hashedPassword = await hashPassword(password);
      const userData = {
        name,
        email,
        password: hashedPassword,
      };
      const user = await this.usersRepository.create(userData);

      // Throw error when user is not created
      if (!user) {
        throw new Error('Error occurred while creating user');
      }

      // Generate jwt token using user id and email
      const token = generateToken(user.id, user.email);

      const authUser = {
        user: excludeFields(user, ['password']),
        token,
      };

      return authUser as AuthUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: UserSchemaType): Promise<User | Error> {
    try {
      const user = await this.usersRepository.update(id, data);
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.usersRepository.delete(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
