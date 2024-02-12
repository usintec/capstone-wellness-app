import { Router } from 'express';
import Controller from '../../Controllers/User'
import { getUserValidator } from '../../Validators/Auth/User';


const router = Router();

router.route('/:id').post(getUserValidator, Controller.getUserById);

export default router;
