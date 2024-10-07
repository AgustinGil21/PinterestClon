import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../config.js';

export const Crypt = async (password: string): Promise<string> => {
  const passwordHash: string = await bcrypt.hash(password, SALT_ROUNDS);

  return passwordHash;
};

export const CryptCompare = async (
  inputPassword: string,
  dbPassword: string
): Promise<boolean> => {
  const compareResult: boolean = await bcrypt.compare(
    inputPassword,
    dbPassword
  );

  return compareResult;
};
