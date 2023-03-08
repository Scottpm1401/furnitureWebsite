import { BillingDetailsType } from '../../purchase';

export type CreatePaymentRequest = {
  paymentMethodType: string;
  currency: string;
};

export type CreatePaymentResponse = {
  clientSecret?: string;
  nextAction?: string;
};

export type confirmPaymentRequest = {
  payment_method: string;
  billing_details: BillingDetailsType;
};
