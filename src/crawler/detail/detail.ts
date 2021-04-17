import request from '../request';
import { MongoClient } from 'mongodb';
import option from '../config';
import { AxiosResponse } from 'axios';
import fs from 'fs';
import path from 'path';

type Data = {
  data: {
    list: { iid: string }[];
  };
};

let data: Data[] = [];
// 查询所有的 iid
const runMongo = async (collection: string) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const col = database.collection(collection);
    const query = {};
    const options = { projection: { 'data.list.iid': 1 } };
    const cursor = col.find(query, options);

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log('No documents found!');
    }

    // 保存查询的结果
    await cursor.forEach((x) => data.push(x));
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

// 对 iid 再进行一次过滤
let iids: string[] = [];
const storeResult = async (cate: string) => {
  await runMongo(cate);
  for (let i of data) {
    for (let o of i.data.list) {
      iids.push(o.iid);
    }
  }
};

// 循环发送所有请求
const createDetail = async (cate: string) => {
  await storeResult(cate);
  let popData: AxiosResponse<any>[] = [];
  let o = 0;
  for (let i of iids) {
    const startTime = Date.now();
    let endTime = startTime;
    // 同步延迟 500ms
    // 尽量对服务器温柔一点
    while (endTime - startTime < 500) {
      endTime = Date.now();
    }
    const res = await request({
      url: '/detail',
      params: {
        iid: i,
      },
    });
    popData.push(res);
    console.log(`已经${cate}的发送第${o}个请求`);
    o++;
  }
  console.log(popData.length);
  const filePath = path.resolve(__dirname, `../data/detail${cate}.json`);
  fs.writeFileSync(filePath, JSON.stringify(popData));
  data = [];
  iids = [];
};

const doIt = async () => {
  await createDetail('pop');
  console.log('pop done!');
  await createDetail('new');
  console.log('new done!');
  await createDetail('sell');
  console.log('sell done!');
};
doIt();

// for (let i = 0; i <= 100; i++) {
//   const startTime = Date.now();
//   let endTime = startTime;
//   while (endTime - startTime < 100) {
//     endTime = Date.now();
//   }
//   console.log(i);
// }
