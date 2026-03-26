// routes/index.ts

import { Router } from 'express';
import {
  createRsvp,
  getRsvpByCode,
  updateRsvp,
  getAllRsvps,
} from '../controllers/rsvp.controller';
import { adminAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/', createRsvp);
router.get('/:code', getRsvpByCode);
router.patch('/:code', updateRsvp);

// Только админ
router.get('/admin/all', adminAuth, getAllRsvps);

export default router;