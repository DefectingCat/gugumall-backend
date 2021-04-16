import Router from 'koa-router';
import multidata from '../controllers/home/multidata';

const router = new Router();

router.get('/home/multidata', multidata);

export default router;
