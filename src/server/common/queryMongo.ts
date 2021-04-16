import { Cursor, MongoClient } from 'mongodb';
import option from '../config';

export type Query = {
  [key: string]: number | string;
};

export let res: Cursor<any>;
export const runMongo = async (collection: string, query: Query = {}) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const multidata = database.collection(collection);
    res = await multidata.findOne(query);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
