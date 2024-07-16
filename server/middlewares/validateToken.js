import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) res.status(401).json({ message: 'User not logged!' });

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) res.status(401).json({ message: 'Invalid token!' });

    req.user = decoded;

    next();
  });
};
