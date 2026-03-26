// backend/src/repositories/rsvp.repository.ts
import { prisma } from '../utils/prisma.js';
import { Prisma } from '@prisma/client';

export class RsvpRepository {
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.RsvpWhereInput;
        orderBy?: Prisma.RsvpOrderByWithRelationInput;
    } = {}) {
        const { skip, take, where, orderBy } = params;

        const [data, total] = await Promise.all([
            prisma.rsvp.findMany({
                skip,
                take,
                where,
                orderBy: orderBy || { createdAt: 'desc' },
                select: {
                    id: true,
                    code: true,
                    name: true,
                    email: true,
                    attending: true,
                    plusOne: true,
                    alcohol: true,
                    comment: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            prisma.rsvp.count({ where }),
        ]);

        return { data, total };
    }
}