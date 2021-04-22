import { MongoClient } from 'mongodb';
import option from '../config';
import fs from 'fs';
import path from 'path';

class Recommend {
  filePath = path.resolve(__dirname, `../data/recommend.json`);
  res: string = '';
  async openFile() {
    this.res = fs.readFileSync(this.filePath).toString();
    this.writeMongo();
  }
  writeMongo = async () => {
    const client = new MongoClient(option.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect();
      const database = client.db('guguMall');
      const col = database.collection('recommend');

      const result = await col.insertOne(JSON.parse(this.res));
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
      );
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  };
}
const test = new Recommend();
test.openFile();
