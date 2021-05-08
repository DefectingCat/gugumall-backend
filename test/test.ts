import Koa from 'koa';
import option from './config';
import router from './routers/index';
import logger from 'koa-logger';
import { cors } from './middleware/CORS';

const app = new Koa();

app.use(logger());
app.use(cors);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(option.port);
console.log(`工作进程${process.pid}已经启动！`);
console.log(`⚡[server]: running on ${option.port}!`);
