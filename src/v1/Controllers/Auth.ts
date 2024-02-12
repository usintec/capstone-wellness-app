import { SuccessResponse } from '../../core/ApiResponse';
import { Request, Response } from 'express';
import { asyncController } from "../Utils/AsyncHandler";
import AuthService from '../Services/Auth'
import { Roles } from '../Type/General';

const register = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const user = {...req.body}
    const data = await AuthService.register(user.email, user.password, Roles.USER)
    return new SuccessResponse('User created successfully!', data).send(res);
})
const registerAdmin = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const user = {...req.body}
    const data = await AuthService.register(user.email, user.password ?? '', Roles.ADMIN)
    return new SuccessResponse('Admin created successfully!', data).send(res);
})
const registerSuperAdmin = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const user = {...req.body}
    const data = await AuthService.register(user.email, user.password, Roles.SUPER_ADMIN)
    return new SuccessResponse('Admin created successfully!', data).send(res);
})
const login = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const user = {...req.body}
    const data = await AuthService.login(user.email, user.password)
    return new SuccessResponse('Login successfully!', data).send(res);
})

const confirmEmail = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const data = await AuthService.confirmEmail({...req.body})
    return new SuccessResponse('Email confirmed successfully!', data).send(res);
})

export default { register, login, confirmEmail, registerAdmin, registerSuperAdmin }