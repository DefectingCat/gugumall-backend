import { Context } from 'koa';
import { Query, res, runMongo } from '../../common/queryMongo';

const detail = async (ctx: Context) => {
  // query 传递的参数
  const iid = ctx.query.iid;
  let query: Query;
  // 类型转换，查询时 page 应该为 number
  if (typeof iid === 'string') {
    query = {
      iid,
    };
    await runMongo('detail', query);
    ctx.body = res;
  } else {
    ctx.body = `<b>缺少参数 [<span style="color:red">iid</span>] ＞﹏＜</b>
    <p>detail中iid参数没有传, 是必传参数.</br>
    格式: <code>/detail?iid=具体的值</code></p>            
    `;
    console.log('居然有人参数传少了（；´д｀）ゞ');
  }
};

export default detail;
