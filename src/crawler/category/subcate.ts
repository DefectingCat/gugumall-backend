import request from '../request';
import { MongoClient } from 'mongodb';
import option from '../config';
import { AxiosResponse } from 'axios';
import fs from 'fs';
import path from 'path';

type Data = {
  data: {
    category: {
      list: { maitKey: string }[];
    };
  };
};

let data: Data;
const runMongo = async (collection: string) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const col = database.collection(collection);
    const option = { projection: { 'data.category.list.maitKey': 1 } };
    const cursor = col.find({}, option);
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log('No documents found!');
    }
    // console.log(cursor);
    // 保存查询的结果
    // await cursor.forEach((x) => data.push(x));
    await cursor.forEach((x) => (data = x));
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

let maitKey: string[] = [];
// 保存所有的 maitKey
const storeResult = async () => {
  await runMongo('category');
  for (let i of data.data.category.list) {
    maitKey.push(i.maitKey);
  }
};

let subCate: AxiosResponse<any>[] = [];
const writeFile = async () => {
  await storeResult();
  for (let i of maitKey) {
    const res = await request({
      url: '/subcategory',
      params: {
        maitKey: i,
      },
    });
    console.log(`已经发送${i}`);
    subCate.push(res);
  }
  const filePath = path.resolve(__dirname, '../data/subcate.json');
  fs.writeFile(filePath, JSON.stringify(subCate), () => {});
};
// writeFile();

const writeMongo = async () => {
  const filePath = path.resolve(__dirname, '../data/subcate.json');
  const res = fs.readFileSync(filePath).toString();
  const data = JSON.parse(res);
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const col = database.collection('subCategory');
    const result = await col.insertMany(data);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedIds}`
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
writeMongo();
