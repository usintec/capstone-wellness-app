import { Router } from 'express';
import Controller from '../../Controllers/Auth'
import { confirmEmailValidator, loginValidator, registerValidator } from '../../Validators/Guest/Auth';

const router = Router();

router.route('/register').post(registerValidator, Controller.register);
router.route('/login').post(loginValidator, Controller.login);
router.route('/confirm-email').post(confirmEmailValidator, Controller.confirmEmail);


export default router;
