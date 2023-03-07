import { ProductColor } from '../product';

export type ProductCartType = {
  product_id: string;
  img: string;
  title: string;
  price: number;
  color: ProductColor;
  quantity: number;
  brand: string;
  category: string;
};
