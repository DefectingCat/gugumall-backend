import Router from 'koa-router';
import multidata from '../controllers/home/multidata';
import recommend from '../controllers/recommend/recommend';
import data from '../controllers/home/data';
import detail from '../controllers/detail/detail';
import category from '../controllers/category/category';
import subCategory from '../controllers/category/subCategory';

const router = new Router();

router.get('/gugu/home/multidata', multidata);
router.get('/gugu/home/data', data);
router.get('/gugu/detail', detail);
router.get('/gugu/category', category);
router.get('/gugu/subCategory', subCategory);
router.get('/gugu/recommend', recommend);

export default router;
