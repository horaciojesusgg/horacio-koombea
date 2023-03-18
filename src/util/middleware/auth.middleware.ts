import { Response } from "express";
import AuthRequest from "./authRequest.interface"
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret_key_horacio';

const authMiddleware = () => {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: AuthRequest, res: Response) {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid authorization header' });
      }

      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return originalMethod.apply(this, arguments);
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    };

    return descriptor;
  };
}

export default authMiddleware;