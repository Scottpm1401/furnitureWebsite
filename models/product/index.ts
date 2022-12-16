export type RatingType = {
  rate: number;
  num_of_rate: number;
};

export type ReviewType = {
  user_id: string;
  username: string;
  email: string;
  phone?: string;
};

export type ProductType = {
  _id: string;
  img: string;
  gallery: string[];
  title: string;
  description?: string;
  category: string;
  brand: string;
  rating?: RatingType;
  review?: ReviewType;
  price: number;
  sku: string;
  storage_quantity: number;
  colors: string[];
};
