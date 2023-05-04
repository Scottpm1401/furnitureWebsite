import { ProductType } from '../../product';
import { PurchaseType } from '../../purchase';
import { SubscriptionType } from '../../subscription';
import { ContentType } from '../../template';
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

export type BannerFormType = {
  image: string;
  title: ContentFormType[];
  description: ContentFormType[];
};

export type ContentFormType = Omit<ContentType, '_id'>;

export type UpdateUserRequest = Partial<
  Omit<UserType, '_id' | 'cart' | 'cart_total'>
> & {
  password?: string;
};

export type UpdateOrderedRequest = Partial<
  Omit<
    PurchaseType,
    | '_id'
    | 'user_id'
    | 'createdAt'
    | 'updatedAt'
    | 'payment_method'
    | 'products'
  >
>;

export type UpdateProductRequest = Omit<
  ProductType,
  '_id' | 'rating' | 'review'
>;

type TemplateRequest = {
  banners: BannerFormType[];
  about: BannerFormType;
  home_footer: ContentFormType[];
  contact: ContentFormType[];
  terms_and_conditions: ContentFormType[];
  privacy_policy: ContentFormType[];
  title: string;
};

export type CreateTemplateRequest = TemplateRequest;

export type UpdateTemplateRequest = TemplateRequest;

export type UpdateSubscriptionRequest = Omit<SubscriptionType, 'email' | '_id'>;
