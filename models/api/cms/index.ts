import {
  BillingDetailsType,
  PurchaseProduct,
  PurchaseStatus,
} from '../../purchase';
import { UserInfoType } from '../../user';

export type CMSList<T> = {
  total: number;
  data: T;
};

export type Pagination = {
  offset: number;
  limit: number;
};

export type SearchPagination = {
  search?: string;
} & Pagination;

export type UpdateUserRequest = {
  displayName?: String;
  username?: string;
  birthday?: string;
  info?: UserInfoType;
  role?: 'ADMIN' | 'USER';
  email?: string;
  password?: string;
};

export type UpdateOrderedRequest = {
  status?: PurchaseStatus;
  arrive_date?: string;
  package_date?: string;
  total_bill?: number;
  products?: PurchaseProduct[];
  billingDetails?: BillingDetailsType;
};
