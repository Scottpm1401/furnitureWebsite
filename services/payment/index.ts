import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  confirmPaymentRequest,
  CreatePaymentRequest,
  CreatePaymentResponse,
} from '../../models/api/payment';
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
