import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../../models/api/auth';
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  SignupRequest,
  SignupResponse,
} from '../../models/api/auth';
import { commonResponse } from '../../models/common';

export const login = async (body: LoginRequest) => {
  const res = await axiosClient.post(API.AUTH.LOGIN, body);
  return res.data as LoginResponse;
};

export const signup = async (body: SignupRequest) => {
  const res = await axiosClient.post(API.AUTH.SIGNUP, body);
  return res.data as SignupResponse;
};

export const logout = async (body: LogoutRequest) => {
  const res = await axiosClient.post(API.AUTH.LOGOUT, body);
  return res.data as commonResponse;
};

export const changePassword = async (body: ChangePasswordRequest) => {
  const res = await axiosClient.post(API.AUTH.CHANGEPASSWORD, body);
  return res.data as LoginResponse;
};

export const forgotPassword = async (body: ForgotPasswordRequest) => {
  const res = await axiosClient.post(API.AUTH.FORGOTPASSWORD, body);
  return res.data as commonResponse;
};

export const resetPassword = async (body: ResetPasswordRequest) => {
  const res = await axiosClient.post(API.AUTH.RESETPASSWORD, body);
  return res.data as commonResponse;
};
