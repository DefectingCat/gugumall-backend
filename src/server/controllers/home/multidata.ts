import { Context } from 'koa';
import { res, runMongo } from '../../common/queryMongo';

const multidata = async (ctx: Context) => {
  await runMongo('multidata');
  ctx.body = res;
};

export default multidata;
