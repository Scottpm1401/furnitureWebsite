import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  SignupRequest,
  SignupResponse,
} from '../../models/api/user';

export const login = async (body: LoginRequest) => {
  const res = await axiosClient.post(API.AUTH.LOGIN, body);
  return res.data as LoginResponse;
};

export const signup = async (body: SignupRequest) => {
  const res = await axiosClient.post(API.AUTH.SIGNUP, body);
  return res.data as SignupResponse;
};

export const logout = async (body: LogoutRequest) => {
  const res = await axiosClient.post(API.AUTH.LOGOUT);
  return res.data as LogoutResponse;
};

export const changePassword = async (body: ChangePasswordRequest) => {
  const res = await axiosClient.post(API.AUTH.CHANGEPASSWORD, body);
  return res.data as LoginResponse;
};
