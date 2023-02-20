import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { CMSList, GetAllUsersParams } from '../../models/api/cms';
import { UserType } from '../../models/user';

export const getAllUsers = async (params: GetAllUsersParams) => {
  const res = await axiosClient.get(API.USER.GETALL, { params });
  return res.data as CMSList<UserType[]>;
};
