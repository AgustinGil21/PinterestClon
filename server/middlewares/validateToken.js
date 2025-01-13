import jwt from 'jsonwebtoken';
import { SECRETKEY } from '../config.js';

export const authRequired = (req, res, next) => {
  const { access_token } = req.cookies;

  if (!access_token)
    return res.status(401).json({ message: 'User not logged!' });

  jwt.verify(access_token, SECRETKEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid access token!' });

    req.user = decoded;

    next();
  });
};
