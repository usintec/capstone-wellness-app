import { Router } from 'express';
import Controller from '../../Controllers/User'
import { getUserValidator, updateProfileValidator } from '../../Validators/Auth/User';


const router = Router();

router.route('/:id').get(getUserValidator, Controller.getUserById);
router.route('/').post(updateProfileValidator, Controller.updateProfile);
router.route('/').get(Controller.getMyProfile);

export default router;
