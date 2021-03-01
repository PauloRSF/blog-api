import { Router } from 'express';

import PostsController from './controllers/postsController';

import tokenAuthentication from '@shared/auth/middlewares/tokenAuthentication';

const router = Router();
const postsController = new PostsController();

router.get('/post', tokenAuthentication, postsController.list);
router.get('/post/search', tokenAuthentication, postsController.search);
router.get('/post/:postId', tokenAuthentication, postsController.retrieve);
router.post('/post', tokenAuthentication, postsController.create);
router.put('/post/:postId', tokenAuthentication, postsController.update);
router.delete('/post/:postId', tokenAuthentication, postsController.delete);

export default router;
