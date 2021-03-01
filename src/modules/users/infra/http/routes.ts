import { Router } from 'express';

import UsersController from './controllers/usersController';

import tokenAuthentication from '@shared/auth/middlewares/tokenAuthentication';

const router = Router();
const usersController = new UsersController();

router.get('/user', tokenAuthentication, usersController.list);
router.get('/user/:userId', tokenAuthentication, usersController.retrieve);
router.post('/user', usersController.create);
router.delete('/user/me', tokenAuthentication, usersController.delete);

router.post('/login', usersController.login);

export default router;
