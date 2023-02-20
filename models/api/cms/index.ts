export type GetAllUsersParams = {
  search?: string;
} & Pagination;

export type CMSList<T> = {
  total: number;
  data: T;
};

export type Pagination = {
  offset: number;
  limit: number;
};
