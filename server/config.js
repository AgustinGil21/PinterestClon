import 'dotenv/config';

export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  SECRETKEY,
  ACCEPTED_ORIGINS,
  RESEND_API_KEY,
  EMAIL_ADDRESS,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  NODE_ENV,
  DATABASE_URL,
} = process.env;

export const BASE_URL = '/pinterest-clon-api';
