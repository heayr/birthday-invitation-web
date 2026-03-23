import { PrismaClient, Rsvp } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

export class RsvpService {
  static async create(data: {
    name: string;
    email?: string;
    attending: boolean;
    plusOne: number;
    alcohol?: data.alcohol,
    comment?: string;
  }): Promise<Rsvp> {
    const code = this.generateUniqueCode();

    return prisma.rsvp.create({
      data: {
        ...data,
        code,
      },
    });
  }

  static async findByCode(code: string): Promise<Rsvp | null> {
    return prisma.rsvp.findUnique({ where: { code } });
  }

  static async updateByCode(
    code: string,
    data: {
      name: string;
      email?: string;
      attending?: boolean;
      plusOne?: number;
      alcohol?: data.alcohol,
      comment?: string;
    }
  ): Promise<Rsvp> {
    const existing = await this.findByCode(code);
    if (!existing) {
      throw new Error('RSVP с таким кодом не найден');
    }

    return prisma.rsvp.update({
      where: { code },
      data,
    });
  }

  static async getAll(): Promise<Rsvp[]> {
    return prisma.rsvp.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  private static generateUniqueCode(): string {
    // 8 символов, читаемые, без неоднозначных символов (0/O, 1/I/l и т.д.)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}