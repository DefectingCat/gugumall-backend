import { Cursor, MongoClient } from 'mongodb';
import option from '../config';

export type Query = {
  [key: string]: number | string;
};
export type ManyQuery = Query[];
type CacheObj = {
  [key: string]: Map<string, Cursor<any> | string>;
};

export let res: Cursor<any> | string | undefined;
export let manyRes: ManyQuery = [];

// 缓存策略，新建一个缓存对象，用于保存查询结果。目前只保存单个数据缓存
let cacheObj: CacheObj = {};

/**
 * 查询MongoDB数据库
 *
 * @param {string} collection 对应的集合
 * @param {Query} query 查询表达式
 * @return {promise}
 */
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
    async function queryMongo() {
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
        console.log('查询了一次数据库');
        res = await col.findOne(query);
        res ? void 0 : (res = '未查询到数据::>_<::');
      }
    }

    // 使用 string 在 Map 中存储缓存数据
    const strQuery = JSON.stringify(query);
    /**
     * 检查缓存对象中是否有数据，
     * 如果有数据，则再检查是否有Map，
     * 如果都有，则直接返回缓存的数据，不查询数据库
     */
    if (cacheObj.hasOwnProperty(collection)) {
      if (cacheObj[collection].has(strQuery)) {
        res = cacheObj[collection].get(strQuery);
        console.log('命中缓存');
      } else {
        await queryMongo();
        cacheObj[collection] = new Map();
        res ? cacheObj[collection].set(strQuery, res) : void 0;
      }
    } else {
      await queryMongo();
      cacheObj[collection] = new Map();
      res ? cacheObj[collection].set(strQuery, res) : void 0;
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};
