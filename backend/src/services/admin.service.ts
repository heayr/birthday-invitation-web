// backend/src/services/admin.service.ts
import { RsvpRepository } from '../repositories/rsvp.repository.js';

export class AdminService {
    private rsvpRepository = new RsvpRepository();

    async getAllResponses(params: {
        page?: number;
        limit?: number;
        search?: string;
        attending?: boolean;
    } = {}) {
        const { page = 1, limit = 20, search, attending } = params;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' as const } },
                { email: { contains: search, mode: 'insensitive' as const } },
            ];
        }

        if (attending !== undefined) {
            where.attending = attending;
        }

        return this.rsvpRepository.findAll({ skip, take: limit, where });
    }
}