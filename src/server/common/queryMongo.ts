import { Cursor, MongoClient } from 'mongodb';
import option from '../config';

export type Query = {
  [key: string]: number | string;
};
export type ManyQuery = Query[];

export let res: Cursor<any> | string;
export let manyRes: ManyQuery = [];
export const runMongo = async (
  collection: string,
  query: Query = {},
  many: boolean = false
) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const col = database.collection(collection);
    if (many) {
      const cursor = col.find(query);
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log('No documents found!');
        res = '未查询到数据::>_<::';
      }
      // 保存查询的结果
      await cursor.forEach((x) => manyRes.push(x));
    } else {
      res = await col.findOne(query);
      res ? void 0 : (res = '未查询到数据::>_<::');
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
