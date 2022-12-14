import { ProductCartType } from '../cart';
import { AddressType } from '../user';

export type PurchaseType = {
  status: 'PACKAGE' | 'SHIPPING' | 'DELIVERED';
  total_bill: number;
  payment_method: string;
  package_date: string;
  arrive_date?: string;
  billingDetails: BillingDetailsType;
  products: PurchaseProduct[];
};

export type BillingDetailsType = {
  name: string;
  email: string;
  phone: string;
  address: AddressType;
};

export type PurchaseProduct = {
  rating?: number;
} & ProductCartType;
