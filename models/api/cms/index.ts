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
  username: string;
  birthday: string;
  info?: UserInfoType;
  role: 'ADMIN' | 'USER';
  email: string;
  password?: string;
};
