import { Router } from 'express';
import PageRouter from './PageRouter.js';
const router = Router();
router.use('/', PageRouter);
export default router;