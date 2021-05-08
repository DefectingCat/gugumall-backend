import os from 'os';
import Koa from 'koa';
import option from './config';
import router from './routers/index';
import logger from 'koa-logger';
import cluster from 'cluster';
import { cors } from './middleware/CORS';

const app = new Koa();
const cpus = os.cpus().length;
// 大于4个超线程时，派分子进程
const len = cpus >= 4 ? cpus / 2 : 1;

if (cluster.isMaster) {
  console.log(`主进程${process.pid}正在运行`);

  // 衍生工作进程
  for (let i = 0; i < len; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程${worker.process.pid}已经退出`);
  });

  console.log(`⚡[server]: running on ${option.port}!`);
} else {
  app.use(logger());
  app.use(cors);
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(option.port);
  console.log(`工作进程${process.pid}已经启动！`);
}
