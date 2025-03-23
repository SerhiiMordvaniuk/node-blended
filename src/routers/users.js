import { Router } from 'express';
import { registerUserSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import { registerUserController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;
