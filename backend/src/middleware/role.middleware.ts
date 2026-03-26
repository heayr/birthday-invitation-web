// backend/src/middleware/role.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ROLES, type Role } from '../config/constants.js';

export const requireRole = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user;   // предполагаем, что auth.middleware кладёт user в req

        if (!user || !user.role) {
            res.status(401).json({ success: false, message: 'Не авторизован' });
            return;
        }

        if (!allowedRoles.includes(user.role as Role)) {
            res.status(403).json({
                success: false,
                message: 'Доступ запрещён. Недостаточно прав.'
            });
            return;
        }

        next();
    };
};