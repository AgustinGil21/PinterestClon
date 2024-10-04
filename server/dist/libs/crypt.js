import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../config.js';
export const Crypt = async (password) => {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    return passwordHash;
};
export const CryptCompare = async (inputPassword, dbPassword) => {
    const compareResult = await bcrypt.compare(inputPassword, dbPassword);
    return compareResult;
};
