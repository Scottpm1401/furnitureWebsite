import { ProductColor } from '../../product';

export type AddToCartRequest = {
  product_id: string;
  color: ProductColor;
  quantity: number;
};

export type RemoveFromCartRequest = {
  product_id: string;
  color: ProductColor;
};

export type UpdateCartQuantityRequest = AddToCartRequest;
