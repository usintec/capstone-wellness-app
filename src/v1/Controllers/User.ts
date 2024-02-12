import { SuccessResponse } from '../../core/ApiResponse';
import { Request, Response } from 'express';
import { asyncController } from "../Utils/AsyncHandler";
import UserService from '../Services/User'
import { Types } from 'mongoose';``

const getUserById = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const data = await UserService.getUserById(req.params.id as unknown as Types.ObjectId)
    return new SuccessResponse('User created successfully!', data).send(res);
})

export default { getUserById }