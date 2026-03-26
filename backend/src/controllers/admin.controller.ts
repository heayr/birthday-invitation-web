// backend/src/controllers/admin.controller.ts
import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service.js';

export class AdminController {
    private adminService = new AdminService();

    async getAllResponses(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const search = (req.query.search as string)?.trim();
            const attending = req.query.attending !== undefined
                ? (req.query.attending as string).toLowerCase() === 'true'
                : undefined;

            const result = await this.adminService.getAllResponses({
                page,
                limit,
                search,
                attending,
            });

            res.json({
                success: true,
                data: result.data,
                pagination: {
                    page,
                    limit,
                    total: result.total,
                    totalPages: Math.ceil(result.total / limit),
                },
            });
        } catch (error: any) {
            console.error('Admin getAllResponses error:', error);
            res.status(500).json({
                success: false,
                message: 'Внутренняя ошибка сервера'
            });
        }
    }
}