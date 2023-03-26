export type DataPoint = {
  month: number;
  revenue: number;
};

export type Revenue = {
  year: number;
  data: DataPoint[];
};
