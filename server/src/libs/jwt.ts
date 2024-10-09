import jwt from 'jsonwebtoken';
// import { SECRETKEY } from '../config.js';
import { SecretKey } from '../interfaces/config/config-interface.d.js';
import { UUIDType } from '../interfaces/basic/basics-interface.d.js';

interface ICreateJWT {
  id: UUIDType;
}

export const createJWT = async (payload: ICreateJWT) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SecretKey,
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
