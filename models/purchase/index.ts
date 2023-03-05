import { ProductCartType } from '../cart';
import { AddressType } from '../user';

export type PurchaseType = {
  _id: string;
  status: PurchaseStatus;
  total_bill: number;
  payment_method: string;
  package_date: string;
  arrive_date?: string;
  billingDetails: BillingDetailsType;
  products: PurchaseProduct[];
  user_id: string;
  createdAt: string;
  updatedAt: string;
};

export enum PurchaseStatus {
  package = 'PACKAGE',
  shipping = 'SHIPPING',
  delivered = 'DELIVERED',
}

export type BillingDetailsType = {
  name: string;
  email: string;
  phone: string;
  address: AddressType;
};

export type PurchaseProduct = {
  _id: string;
  rating?: number;
} & ProductCartType;
