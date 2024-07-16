import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const createJWT = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: '30d',
      },
      (err, token) => {
        if (err) reject('Token cannot be created!');
        resolve(token);
      }
    );
  });
};
