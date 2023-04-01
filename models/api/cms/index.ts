import { ProductType } from '../../product';
import { PurchaseType } from '../../purchase';
import { TemplateType } from '../../template';
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

export type UpdateProductRequest = Omit<ProductType, '_id'>;

export type CreateTemplateRequest = Omit<TemplateType, '_id' | 'active'>;

export type UpdateTemplateRequest = Partial<
  Omit<TemplateType, '_id' | 'active'>
>;
