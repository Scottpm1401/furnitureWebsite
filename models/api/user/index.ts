import { UserInfoType } from '../../user';

export type LoginRequest = {
  email?: string;
  username?: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  username: string;
  password: string;
  birthday: string;
};

export type SignupResponse = {} & LoginResponse;

export type LogoutRequest = {
  refreshToken: string;
};

export type UpdateSelfUserRequest = {
  displayName?: String;
  username?: string;
  birthday?: string;
  info?: UserInfoType;
};

export type UpdateSelfUserResponse = {};

export type RefreshTokenRequesst = {
  refreshToken: string;
};

export type LoginResponse = {
  accessToken: string;
  expiredDate: string;
  refreshToken: string;
};

export type LogoutResquest = {
  refreshToken: string;
};

export type LogoutResponse = {
  success: boolean;
};

export type ChangePasswordRequest = {
  password: string;
  newPassword: string;
};
