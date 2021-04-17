import { MongoClient } from 'mongodb';
import option from '../config';
import fs from 'fs';
import path from 'path';

// 写入
const writeMongo = async (data: string[]) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const col = database.collection('detail');

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

// 删除自带的 _id
const modifyFile = async (path: string, data: string) => {
  const reg = /\"_id\"\:\"[A-Za-z0-9]*\",/g;
  const newFile = data.replaceAll(reg, '');
  fs.writeFileSync(path, newFile);
};

const openFile = async (cate: string) => {
  const filePath = path.resolve(__dirname, `../data/detail${cate}.json`);
  const res = fs.readFileSync(filePath).toString();
  // modifyFile(filePath, res);
  await writeMongo(JSON.parse(res));
};
// openFile('new');
// openFile('pop');
// openFile('sell');
