import Router from 'koa-router';
import multidata from '../controllers/home/multidata';
import recommend from '../controllers/recommend/recommend';
import data from '../controllers/home/data';
import detail from '../controllers/detail/detail';
import category from '../controllers/category/category';
import subCategory from '../controllers/category/subCategory';

const router = new Router();

router.get('/home/multidata', multidata);
router.get('/home/data', data);
router.get('/detail', detail);
router.get('/category', category);
router.get('/subCategory', subCategory);
router.get('/recommend', recommend);

export default router;
