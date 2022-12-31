import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  SignupRequest,
  SignupResponse,
} from '../../models/api/user';

export const login = async (body: LoginRequest) => {
  const res = await axiosClient.post(API.USER.LOGIN, body);
  return res.data as LoginResponse;
};

export const signup = async (body: SignupRequest) => {
  const res = await axiosClient.post(API.USER.SIGNUP, body);
  return res.data as SignupResponse;
};

export const logout = async (body: LogoutRequest) => {
  const res = await axiosClient.post(API.USER.LOGOUT);
  return res.data as LogoutResponse;
};
