import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { PurchaseType } from '../../models/purchase';

export const getSelfOrdered = async () => {
  const res = await axiosClient.get(API.ORDERED.GETSELF);
  return res.data as PurchaseType[];
};
