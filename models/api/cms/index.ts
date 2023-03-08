import { ProductType } from '../../product';
import { PurchaseType } from '../../purchase';
import { UserType } from '../../user';

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

export type UpdateUserRequest = Partial<
  Omit<UserType, '_id' | 'cart' | 'cart_total'>
> & {
  password?: string;
};

export type UpdateOrderedRequest = Partial<
  Omit<
    PurchaseType,
    '_id' | 'user_id' | 'createdAt' | 'updatedAt' | 'payment_method'
  >
>;

export type UpdateProductRequest = Partial<Omit<ProductType, '_id'>>;
