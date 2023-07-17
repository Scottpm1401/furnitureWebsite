import axios, { AxiosError } from 'axios';
import moment from 'moment';

import { APP_ROUTES } from '../constant';
import { API } from '../constant/api';
import { Role, UserType } from '../models/user';
import { actions } from '../redux/reducer';
import { AuthState } from '../redux/reducers/authReducer';
import { store } from '../redux/store';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
type FailedQueue = {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
};
let failedQueue: FailedQueue[] = [];
function processQueue(error: AxiosError | Error | null, token: string | null) {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
}

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
    if (originalConfig.url !== APP_ROUTES.login && err.response) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalConfig.headers) {
              originalConfig.headers.Authorization = `Bearer ${token}`;
            }
            return axiosClient(originalConfig);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      const { role }: UserType = store.getState().user;

      if (
        err.response.status === 401 ||
        (err.response.status === 403 &&
          (role === Role.admin ||
            role === Role.super_admin ||
            role === Role.owner))
      )
        return new Promise((resolve, reject) => {
          const f = async () => {
            try {
              const { data } = await axios.post(
                API.AUTH.REFRESHTOKEN,
                {
                  refreshToken,
                },
                {
                  baseURL: process.env.NEXT_PUBLIC_BE_URL,
                }
              );
              const newAccessToken = data.accessToken;
              axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
              if (originalConfig.headers)
                originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

              store.dispatch(
                actions.auth.setAuth({
                  accessToken: data.accessToken,
                  expiredDate: data.expiredDate,
                  refreshToken,
                })
              );
              processQueue(null, newAccessToken);
              resolve(axiosClient(originalConfig));
            } catch (err) {
              if (axios.isAxiosError(err) || err instanceof Error)
                processQueue(err, null);
              store.dispatch(
                actions.auth.setAuth({
                  accessToken: null,
                  expiredDate: null,
                  refreshToken: null,
                })
              );
              if (window) window.location.href = APP_ROUTES.login;
              reject(err);
            } finally {
              isRefreshing = false;
            }
          };
          f();
        });
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(err);
  }
);

export default axiosClient;
