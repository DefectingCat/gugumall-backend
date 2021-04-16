import request from './request';
import { AxiosResponse } from 'axios';

const homeData = async () => {
  let data: AxiosResponse<any>[] = [];
  const reqHomeData = async (type: string, page: number) => {
    const res = await request({
      url: 'home/data',
      params: {
        type,
        page,
      },
    });
    data.push(res);
  };
  for (let i = 1; i <= 50; i++) {
    await reqHomeData('pop', i);
  }
  console.log(data);
};
homeData();
