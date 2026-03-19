import { Request, Response, NextFunction } from 'express';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Basic ')) {
    return res.status(401).json({ success: false, message: 'Требуется авторизация' });
  }

  const base64 = auth.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString();
  const [username, password] = decoded.split(':');

  if (username !== 'admin' || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Неверные данные' });
  }

  next();
};