import { BillingDetailsType } from '../../purchase';

export type CreatePaymentRequest = {
  paymentMethodType: string;
  currency: string;
};

export type CreatePaymentResponse = {
  clientSecret?: string;
  nextAction?: string;
};

export type confirmPaymentResquest = {
  card_brand: string;
  billing_details: BillingDetailsType;
};
