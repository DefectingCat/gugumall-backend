import request from '../request';
import { MongoClient } from 'mongodb';
import option from '../config';
import { AxiosResponse } from 'axios';

const runMongo = async (data: AxiosResponse<any>) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const multidata = database.collection('multidata');

    const result = await multidata.insertOne(data);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

const multidata = async () => {
  // 推荐信息
  const res = await request({
    url: '/home/multidata',
  });
  await runMongo(res);
};

multidata();
