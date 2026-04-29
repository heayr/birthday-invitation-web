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
import {
  adminAllLimiter,
  createRsvpLimiter,
  getRsvpLimiter,
  updateRsvpLimiter,
} from '../middleware/rateLimit.middleware.js';

const router = Router();

const adminController = new AdminController();

// === Админские роуты (защищённые Basic Auth) ===
router.get(
  '/admin/all',
  adminAllLimiter,
  adminAuth,
  adminController.getAllResponses.bind(adminController)
);

// === Публичные / гостевые роуты ===
router.post('/', createRsvpLimiter, createRsvp);
router.get('/:code', getRsvpLimiter, getRsvpByCode);
router.patch('/:code', updateRsvpLimiter, updateRsvp);



export default router;