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
