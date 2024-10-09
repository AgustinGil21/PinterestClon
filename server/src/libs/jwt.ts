import jwt from 'jsonwebtoken';
import { SECRETKEY } from '../config.js';
import { UUIDType } from '../interfaces/basic/basics-interface.js';

interface ICreateJWT {
  id: UUIDType;
}

export const createJWT = async (payload: ICreateJWT) => {
  const secretKey = SECRETKEY as string;

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretKey,
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
