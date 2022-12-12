import axios from 'axios';
import moment from 'moment';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
  timeout: 45000,
  headers: { Accept: '*/*', 'Content-Type': 'application/json' },
});

// Add a request interceptor
axios.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const expiredDate = await localStorage.getItem('expiredDate');

      if (expiredDate === null) {
        return config;
      }

      // Date.now() is in milliseconds expires is in seconds
      // tslint:disable-next-line:radix
      if (moment().isBefore(expiredDate)) {
        const accessToken = await localStorage.getItem('accessToken');
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    }
    // Do something before request is sent
    return config;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (err) => {
    const refreshToken = await localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return Promise.reject(err);
    }
    const originalConfig = err.config;
    if (originalConfig.url !== '/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BE_URL}/user/refreshToken`,
            {
              refreshToken,
            }
          );
          await localStorage.setItem('accessToken', data.accessToken);
          await localStorage.setItem('expires', data.expiredAt);

          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: `Bearer ${data.accessToken}`,
          };

          return axiosClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(err);
  }
);

export default axiosClient;
