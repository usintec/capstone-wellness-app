import * as dotenv from 'dotenv';
dotenv.config();

export const appInstance = process.env.APP_INSTANCE ?? '';
export const appEnv = process.env.APP_ENV ?? 'staging';
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logDir = process.env.LOG_DIR;
export const ApiResponsePageSize = parseInt(process.env.API_RESPONSE_PAGE_SIZE ?? '1')
//Authentication
export const JWT_SECRET = process.env.JWT_SECRET || '';
//Database
export const MONGO_URI = process.env.MONGO_URI;

export const BrevoApiKey = process.env.BREVO_API_KEY || '';
export const BrevoBaseUrl = process.env.BREVO_BASE_URL || 'https://api.brevo.com/v3/smtp/email';
export const BrevoSenderEmail = process.env.BREVO_SENDER_EMAIL || '';
export const BrevoSenderName= process.env.BREVO_SENDER_NAME|| '';

