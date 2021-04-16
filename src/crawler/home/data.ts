import request from '../request';
import { MongoClient } from 'mongodb';
import option from '../config';
import { AxiosResponse } from 'axios';

const runMongo = async (collection: string, data: AxiosResponse<any>[]) => {
  const client = new MongoClient(option.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('guguMall');
    const col = database.collection(collection);

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

type Data = {
  [key: string]: AxiosResponse<any>[];
};
const homeData = async () => {
  let data: Data = {
    pop: [],
    new: [],
    sell: [],
  };
  const reqHomeData = async (type: string, page: number) => {
    const res = await request({
      url: 'home/data',
      params: {
        type,
        page,
      },
    });
    data[type].push(res);
  };
  for (let i = 1; i <= 50; i++) {
    await reqHomeData('pop', i);
  }
  for (let i = 1; i <= 50; i++) {
    await reqHomeData('new', i);
  }
  for (let i = 1; i <= 20; i++) {
    await reqHomeData('sell', i);
  }
  runMongo('pop', data.pop);
  runMongo('new', data.new);
  runMongo('sell', data.sell);
};
homeData();
