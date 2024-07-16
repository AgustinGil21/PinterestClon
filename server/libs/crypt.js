import bcrypt from 'bcryptjs';

export const Crypt = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);

  return passwordHash;
};

export const CryptCompare = async (inputPassword, dbPassword) => {
  const compareResult = await bcrypt.compare(inputPassword, dbPassword);

  return compareResult;
};
