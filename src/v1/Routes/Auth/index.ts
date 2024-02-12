import { Router } from 'express';
import User from './User'
// import SuperAdmin from '../Auth/SuperAdmin/index'
// import Admin from '../Auth/Admin/index'
// import { adminPermission, superAdminPermission } from '../../Middleware/Permission';
const router = Router();

router.use('/users', User);
// router.use('/super-admin', superAdminPermission, SuperAdmin);
// router.use('/admin', adminPermission, Admin);

export default router;
