import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { commonResponse } from '../../models/common';
import { SubscribeRequest } from '../../models/subscription';

export const userSubscribe = async (body: SubscribeRequest) => {
  const res = await axiosClient.post(API.SUBSCRIPTION.SUBSCRIBE, body);
  return res.data as commonResponse;
};
