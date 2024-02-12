import { SuccessResponse } from '../../core/ApiResponse';
import { Request, Response } from 'express';
import { asyncController } from "../Utils/AsyncHandler";
import UserService from '../Services/User'
import { Types } from 'mongoose';``

const getUserById = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const data = await UserService.getUserById(req.params.id as unknown as Types.ObjectId)
    return new SuccessResponse('User created successfully!', data).send(res);
})

const updateProfile = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const data = await UserService.updateProfile(req.user._id as unknown as Types.ObjectId, req.body)
    return new SuccessResponse('User profile updated successfully!', data).send(res);
})

const getMyProfile = asyncController(async (req: Request, res: Response): Promise<Response> => {
    const data = await UserService.getMyProfile(req.user._id as unknown as Types.ObjectId)
    return new SuccessResponse('User profile fetched successfully!', data).send(res);
})

export default { getUserById, updateProfile, getMyProfile }