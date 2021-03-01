import { NextFunction, Request, Response, Router } from 'express';
import 'express-async-errors';

import userRoutes from '@modules/users/infra/http/routes';

import { APIError } from '@shared/errors/apiError';

const router = Router();

router.use('', userRoutes);

router.all('*', function (req, _) {
  throw new APIError(`${req.method} ${req.url}: not found`, 404);
});

router.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }
});

export default router;
