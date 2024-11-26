import { User } from '@prisma/client';

export type AuthUser = {
  user: User;
  token: string;
};
