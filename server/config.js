import 'dotenv/config';

export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  SECRETKEY,
  ACCEPTED_ORIGINS,
} = process.env;
export const BASE_URL = '/pinterest-clon-api';
