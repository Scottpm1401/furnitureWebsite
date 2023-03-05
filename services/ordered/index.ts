import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { CMSList, SearchPagination } from '../../models/api/cms';
import { PurchaseType } from '../../models/purchase';

export const getSelfOrdered = async () => {
  const res = await axiosClient.get(API.ORDERED.GETSELF);
  return res.data as PurchaseType[];
};

export const getAllOrdered = async (params: SearchPagination) => {
  const res = await axiosClient.get(API.ORDERED.GETALL, { params });
  return res.data as CMSList<PurchaseType[]>;
};
