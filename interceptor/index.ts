import axios from 'axios';
import moment from 'moment';

import { API } from '../api';
import { actions } from '../redux/reducer';
import { AuthState } from '../redux/reducers/authReducer';
import { store } from '../redux/store';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL || '',
  timeout: 10000,
  headers: { Accept: '*/*', 'Content-Type': 'application/json' },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    const { accessToken, expiredDate }: AuthState = store.getState().auth;
    if (expiredDate === null) {
      return config;
    }

    // Date.now() is in milliseconds expires is in seconds
    if (moment().isBefore(expiredDate)) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
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
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (err) => {
    const { refreshToken }: AuthState = store.getState().auth;
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
            API.REFRESHTOKEN,
            {
              refreshToken,
            },
            {
              baseURL: process.env.NEXT_PUBLIC_BE_URL,
            }
          );
          store.dispatch(
            actions.auth.setAuth({
              accessToken: data.accessToken,
              expiredDate: data.expiredDate,
              refreshToken,
            })
          );

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
