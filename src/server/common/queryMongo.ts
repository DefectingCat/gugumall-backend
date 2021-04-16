import { Cursor, MongoClient } from 'mongodb';
import option from '../config';

let res: Cursor<any>;
const runMongo = async (collection: string, query: {} = {}) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const multidata = database.collection(collection);
    res = await multidata.findOne(query);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

export { res, runMongo };
