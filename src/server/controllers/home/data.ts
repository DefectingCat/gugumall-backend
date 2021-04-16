import { Context } from 'koa';
import { Query, res, runMongo } from '../../common/queryMongo';

const data = async (ctx: Context) => {
  // query 传递的参数
  const collection = ctx.query.type;
  const page = ctx.query.page;
  let query: Query;
  // 类型转换，查询时 page 应该为 number
  if (page && collection) {
    query = {
      'data.page': +page,
    };
    typeof collection === 'string' ? await runMongo(collection, query) : void 0;
    ctx.body = res;
  } else {
    ctx.body = `<b>缺少参数 [<span style="color:red">type&page</span>] ＞﹏＜</b>
    <p>type(sell/pop/new三个其中之一)和page(page从1开始)参数没有传, 是必传参数.</br>
    格式: <code>/home/data?type=sell&page=1</code></p>            
    `;
    console.log('居然有人参数传少了（；´д｀）ゞ');
  }
};

export default data;
