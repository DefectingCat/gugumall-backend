import { MongoClient } from 'mongodb';

const runMongo = async () => {
  const client = new MongoClient('mongodb://127.0.0.1/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

[
  { name: 'xfy', age: 18, sex: '男', grade: 60 },
  { name: 'lisi', age: 19, sex: '女', grade: 66 },
  { name: 'wanger', age: 28, sex: '男', grade: 76 },
  { name: 'dfy', age: 38, sex: '男', grade: 99 },
  { name: 'dhl', age: 21, sex: '女', grade: 120 },
  { name: 'wudi', age: 35, sex: '男', grade: 149 },
  { name: 'xiaofeiyang', age: 22, sex: '女', grade: 39 },
  { name: 'test', age: 32, sex: '女', grade: 83 },
  { name: 'main', age: 20, sex: '女', grade: 95 },
  { name: 'detail', age: 27, sex: '男', grade: 101 },
  { name: 'multiply', age: 33, sex: '男', grade: 112 },
  { name: 'minus', age: 21, sex: '女', grade: 132 },
];
