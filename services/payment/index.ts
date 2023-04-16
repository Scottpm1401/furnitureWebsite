import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  confirmPaymentRequest,
  CreatePaymentRequest,
  CreatePaymentResponse,
} from '../../models/api/payment';
import { commonResponse } from '../../models/common';
import { PurchaseType } from '../../models/purchase';

export const createPayment = async () => {
  const res = await axiosClient.post(API.PAYMENT.CHECKOUT, {
    currency: 'usd',
    paymentMethodType: 'card',
  } as CreatePaymentRequest);
  return res.data as CreatePaymentResponse;
};

export const confirmPayment = async (body: confirmPaymentRequest) => {
  const res = await axiosClient.post(API.PAYMENT.CONFIRM, body);
  return res.data as PurchaseType[];
};

export const productCheck = async (id: string, quantity: number) => {
  const res = await axiosClient.post(API.PAYMENT.CHECK(id), { quantity });
  return res.data as commonResponse;
};
