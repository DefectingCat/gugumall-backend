import request from '../request';
import { MongoClient } from 'mongodb';
import option from '../config';
import { AxiosResponse } from 'axios';

const runMongo = async (collection: string, data: AxiosResponse<any>) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const col = database.collection(collection);
    const result = await col.insertOne(data);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

let res: AxiosResponse<any>;
const reqCategory = async () => {
  res = await request({
    url: 'category',
  });
  runMongo('category', res);
};
reqCategory();
