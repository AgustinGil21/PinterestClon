import jwt from 'jsonwebtoken';
import { SecretKey } from '../interfaces/config/config-interface.d.js';
export const authRequired = (req, res, next) => {
    const { access_token } = req.cookies;
    if (!access_token)
        res.status(401).json({ message: 'User not logged!' });
    jwt.verify(access_token, SecretKey, (err, decoded) => {
        if (err)
            res.status(401).json({ message: 'Invalid access token!' });
        req.user = decoded;
        next();
    });
};
