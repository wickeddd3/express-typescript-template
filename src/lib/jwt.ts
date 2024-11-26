import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '@/config/jwt-options';
import Token from '@/interfaces/token.interface';

export const generateToken = (id: number | string, email: string): string => {
  return jwt.sign({ id, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as Token);
    });
  });
};
