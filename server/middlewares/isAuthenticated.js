import jwt from 'jsonwebtoken';
import { SECRETKEY } from '../config.js';

export const isAuthenticated = (req, res, next) => {
  const { access_token } = req.cookies;

  if (!access_token) {
    req.isAuthenticated = false;
    return next();
  }

  jwt.verify(access_token, SECRETKEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid access token!' });

    req.isAuthenticated = true;
    req.user = decoded;

    next();
  });
};
