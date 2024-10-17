import jwt from 'jsonwebtoken';
// import { SECRETKEY } from '../config.js';
import { SecretKey } from '../interfaces/config/config-interface.d.js';
export const createJWT = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SecretKey, {
            expiresIn: '30d',
        }, (err, token) => {
            if (err)
                reject('Token cannot be created!');
            resolve(token);
        });
    });
};
