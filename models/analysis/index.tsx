export type DataPoint = {
  month: number;
  revenue: number;
};

export type Revenue = {
  year: number;
  data: DataPoint[];
};

export type BoughtProduct = {
  product_id: string;
  title: string;
  num_of_purchase: number;
};

export type TopUser = {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  paid: number;
  bought_products_quantity: number;
};

export type AnalysisDate = {
  month: number;
  year: number;
};
