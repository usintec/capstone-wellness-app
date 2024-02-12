import mongoose from 'mongoose';
import { MONGO_URI } from '.';
import Logger from '../core/Logger';

export const connectDatabase = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.connect(MONGO_URI!).then(() => {
        Logger.error('Connected to database');
    }).catch((err) => {
        console.log(err);
    })
}