import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { SecretKey } from '../interfaces/config/config-interface.d.js';
// import { SECRETKEY } from '../config.js';

export interface DecodedToken extends JwtPayload {
  id: string;
}

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.cookies;

  if (!access_token) res.status(401).json({ message: 'User not logged!' });

  jwt.verify(
    access_token,
    SecretKey,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err) res.status(401).json({ message: 'Invalid access token!' });

      req.user = decoded as DecodedToken;

      next();
    }
  );
};
