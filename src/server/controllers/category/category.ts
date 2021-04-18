import { Context } from 'koa';
import { res, runMongo } from '../../common/queryMongo';

const detail = async (ctx: Context) => {
  await runMongo('category', {});
  ctx.body = res;
};

export default detail;
