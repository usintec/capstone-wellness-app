import { param, query, body } from 'express-validator';

export const paginationValidator = [
  query('page').default(0).toInt(),
  query('per_page').default(10).toInt(),
];
