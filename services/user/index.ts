import axios from 'axios';

import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  ChangePasswordRequest,
  LoginResponse,
  UpdateSelfUserRequest,
} from '../../models/api/user';
import { UserType } from '../../models/user';

export type UploadUserAva = {
  public_id: string;
  version?: number;
};

export const getProfile = async () => {
  const res = await axiosClient.get(API.USER.GETSELF);
  return res.data as UserType;
};

export const changePassword = async (body: ChangePasswordRequest) => {
  const res = await axiosClient.post(API.USER.CHANGEPASSWORD, body);
  return res.data as LoginResponse;
};

export const updateUser = async (body: UpdateSelfUserRequest) => {
  const res = await axiosClient.patch(API.USER.UPDATESELF, body);
  return res.data as UserType;
};

export const uploadUserAva = async (body: FormData) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_CLOUDINARY_URL || '',
    body,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return {
    public_id: res.data.public_id,
    version: res.data.version,
  } as UploadUserAva;
};
