import { Cursor, MongoClient } from 'mongodb';
import option from '../config';
import fs from 'fs';
import path from 'path';

type Query = {
  [key: string]: number | string;
};
type ManyQuery = Query[];

class NewSub {
  res: Cursor<any> | undefined;
  manyRes: ManyQuery = [];
  filePath = path.resolve(__dirname, `../data/sub.json`);
  constructor() {}
  runMongo = async (
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
      const option = {
        projection: { _id: 0, 'data.info.title': 1, 'data.list': 1 },
      };
      if (many) {
        const cursor = col.find(query, option);
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
          console.log('No documents found!');
        }
        // 保存查询的结果
        await cursor.forEach((x) => this.manyRes.push(x));
        await cursor.forEach(console.dir);
        console.log(this.manyRes);
      } else {
        this.res = await col.findOne(query);
      }
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  };
  writeFile() {
    fs.writeFile(this.filePath, JSON.stringify(this.manyRes), (err) => {
      console.log(err);
    });
  }
  async doIt() {
    // await this.runMongo('subCategory', {}, true);
    // this.writeFile();
    this.writeMongo('subCategory');
  }
  writeMongo = async (collection: string) => {
    const client1 = new MongoClient(option.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client1.connect();
      const database = client1.db('guguMall');
      const col = database.collection(collection);
      const file = fs.readFileSync(this.filePath).toString();
      await col.insertOne(JSON.parse(file));
    } catch (err) {
      console.log(err);
    } finally {
      await client1.close();
    }
  };
}
const test = new NewSub();
test.doIt();
