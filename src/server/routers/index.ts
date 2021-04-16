import Router from 'koa-router';
import multidata from '../controllers/home/multidata';
import data from '../controllers/home/data';
import detail from '../controllers/detail/detail';

const router = new Router();

router.get('/home/multidata', multidata);
router.get('/home/data', data);
router.get('/detail', detail);

export default router;
