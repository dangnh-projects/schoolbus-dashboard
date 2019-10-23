import MockAxios from 'axios-mock-adapter';

import { buildRequest } from './index';

const fakeData = {
  data: 1,
};

describe('Build request', () => {
  it('Fake', () => {});
  // const facekApi = buildRequest('/fake');
  // const mock = new MockAxios(facekApi.instance);
  // it('should return a function', () => {
  //   expect(typeof facekApi.request).toEqual('function');
  // });
  // describe('successful', () => {
  //   let response;
  //   beforeEach(async () => {
  //     mock.onGet('/fake').reply(200, fakeData);
  //     response = await facekApi.request();
  //   });
  //   it('should return correct data', () => {
  //     const { body, httpStatus } = response;
  //     expect(httpStatus).toEqual(200);
  //     expect(body).toEqual(fakeData);
  //   });
  // });
});
