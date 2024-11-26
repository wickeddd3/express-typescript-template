import bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, 10);
};

export const isPasswordValid = async (hashedPassword: string, plainPassword: string): Promise<boolean> => {
  return await bcrypt.compare(hashedPassword, plainPassword);
};
