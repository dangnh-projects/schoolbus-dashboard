import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const baseHeader = {
  'Content-Type': 'application/json',
};

export function buildRequest(url, requestConfig = {}) {
  const instance = axios.create({
    baseURL: BASE_URL + url,
    ...requestConfig,
    headers: {
      ...baseHeader,
      ...requestConfig.headers,
    },
  });

  return {
    instance,
    request: async function(payload = {}, authenticated = true) {
      if (!payload.headers) payload.headers = {};
      // if (authenticated)
      //   payload.headers['Authorization'] = `Token ${localStorage.getItem(
      //     'utk'
      //   )}`;

      const res = await instance(payload);
      const { data: body, status: httpStatus } = res;
      return { body, httpStatus };
    },
  };
}
