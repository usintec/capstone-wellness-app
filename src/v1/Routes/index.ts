import { Router } from 'express';
import { authenticate } from '../Middleware/Auth';
import Public from './Public'
import Auth from './Auth'

const router = Router();

router.use('/public', Public);
router.use('/', authenticate, Auth);

export default router;
