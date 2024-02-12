import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: 'You have exceeded the 500 requests in 15 minutes limit!',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // doesn't count successful requests
});
