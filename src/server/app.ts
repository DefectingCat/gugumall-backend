import Koa from 'koa';
const app = new Koa();
import option from './config';
import router from './routers/index';
import logger from 'koa-logger';

app.use(logger());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(option.port);
console.log('⚡[server]: running on 3000!');
