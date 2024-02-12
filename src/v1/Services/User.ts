import { Types } from 'mongoose';
import { NotFoundResponse } from '../../core/ApiResponse';
import UserModel from '../Models/User'
import UserDocument from '../Interface/User';
import { AuthFailureError, BadRequestError } from '../../core/ApiError';

const getUserById = async (id: Types.ObjectId | undefined) => {
    if(id){
        const user = UserModel.findById(id);
        if(!user) throw new NotFoundResponse('User not found')
        return user
    }
}

const changeUserPassword = async (
    user: UserDocument,
    oldPassword: string,
    newPassword: string
) => {
    user = (await UserModel.findById(user._id).select("+password")) as UserDocument;

    const isValidOldPassword = await user.isValidPassword(oldPassword);
    if (!isValidOldPassword) {
        throw new AuthFailureError("You have provided the wrong old password");
    }
    user.password = newPassword;
    await user.save();
}

const updateProfile = async (userId: Types.ObjectId, userDoc: UserDocument) => {
    const user = await UserModel.updateOne({_id: userId}, {...userDoc})
    if(!user) throw new BadRequestError('user not updated')
    return user
}
const getMyProfile = async (userId: Types.ObjectId) => {
    const user = await UserModel.findById(userId)
    if(!user) throw new BadRequestError('user not updated')
    return user
}
export default { getUserById, changeUserPassword, updateProfile, getMyProfile }