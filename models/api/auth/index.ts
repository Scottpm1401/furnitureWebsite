export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  password: string;
  token: string;
};
export type LoginResponse = {
  accessToken: string;
  expiredDate: string;
  refreshToken: string;
};

export type ChangePasswordRequest = {
  password: string;
  newPassword: string;
};

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
