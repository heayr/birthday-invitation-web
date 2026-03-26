// backend/src/routes/index.ts
import { Router } from 'express';
import {
  createRsvp,
  getRsvpByCode,
  updateRsvp,
} from '../controllers/rsvp.controller.js';

// Новый чистый админ контроллер
import { AdminController } from '../controllers/admin.controller.js';
import { adminAuth } from '../middleware/auth.middleware.js';

const router = Router();

const adminController = new AdminController();

// === Публичные / гостевые роуты ===
router.post('/', createRsvp);
router.get('/:code', getRsvpByCode);
router.patch('/:code', updateRsvp);

// === Админские роуты (защищённые Basic Auth) ===
router.get(
  '/admin/all',
  adminAuth,
  adminController.getAllResponses.bind(adminController)
);

export default router;