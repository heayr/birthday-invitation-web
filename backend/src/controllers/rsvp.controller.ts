import { Request, Response } from 'express';
import { z } from 'zod';
import { RsvpService } from '../services/rsvp.service';

const createSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое').max(100),
  email: z
    .string()
    .email('Некорректный email')
    .optional()
    .or(z.literal('')),
  attending: z.boolean(),
  plusOne: z.number().int().min(0).max(10),
  alcohol: z.string().max(200).optional(),
  comment: z.string().max(500).optional(),
});

const updateSchema = createSchema.partial().extend({
  attending: z.boolean().optional(),
  plusOne: z.number().optional(),
});

export const createRsvp = async (req: Request, res: Response) => {
  try {
    const data = createSchema.parse(req.body);
    const rsvp = await RsvpService.create(data);

    res.status(201).json({
      success: true,
      code: rsvp.code,
      message: 'Спасибо! Твой ответ сохранён.',
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

export const getRsvpByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const rsvp = await RsvpService.findByCode(code);

    if (!rsvp) {
      return res.status(404).json({ success: false, message: 'Не найден' });
    }

    res.json({ success: true, data: rsvp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

export const updateRsvp = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const data = updateSchema.parse(req.body);

    const updated = await RsvpService.updateByCode(code, data);

    res.json({ success: true, data: updated });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    if (err instanceof Error && err.message.includes('не найден')) {
      return res.status(404).json({ success: false, message: err.message });
    }
    console.error(err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

export const getAllRsvps = async (_req: Request, res: Response) => {
  try {
    const list = await RsvpService.getAll();
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

// src/controllers/rsvp.controller.ts




// import { Request, Response } from 'express';
// import { z } from 'zod';
// import { RsvpService } from '../services/rsvp.service';

// // Схема создания (email теперь optional)
// const createSchema = z.object({
//   name: z.string().min(2, 'Имя слишком короткое').max(100),
//   email: z
//     .string()
//     .email('Некорректный email')
//     .optional()
//     .or(z.literal('')),
//   attending: z.boolean(),
//   plusOne: z.number().int().min(0).max(10),
//   alcohol: z.string().max(200).optional(), // ← новое поле
//   comment: z.string().max(500).optional(),
// });

// // Схема обновления — почти всё optional
// const updateSchema = createSchema.partial().extend({
//   attending: z.boolean().optional(),
//   plusOne: z.number().optional(),
// });

// export const createRsvp = async (req: Request, res: Response) => {
//   try {
//     const data = createSchema.parse(req.body);
//     const rsvp = await RsvpService.create(data);
//     res.status(201).json({
//       success: true,
//       code: rsvp.code,
//       message: 'Спасибо! Твой ответ сохранён.',
//     });
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return res.status(400).json({ success: false, errors: err.errors });
//     }
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Ошибка сервера' });
//   }
// };

// export const getRsvpByCode = async (req: Request, res: Response) => {
//   try {
//     const { code } = req.params;
//     const rsvp = await RsvpService.findByCode(code);
//     if (!rsvp) {
//       return res.status(404).json({ success: false, message: 'Не найден' });
//     }
//     res.json({ success: true, data: rsvp });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Ошибка сервера' });
//   }
// };

// export const updateRsvp = async (req: Request, res: Response) => {
//   try {
//     const { code } = req.params;
//     const data = updateSchema.parse(req.body);
//     const updated = await RsvpService.updateByCode(code, data);
//     res.json({ success: true, data: updated });
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return res.status(400).json({ success: false, errors: err.errors });
//     }
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Ошибка сервера' });
//   }
// };

// export const getAllRsvps = async (_req: Request, res: Response) => {
//   try {
//     const list = await RsvpService.getAll();
//     res.json({ success: true, data: list });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Ошибка сервера' });
//   }
// };