import { ProductColor } from '../../product';
import { UserType } from '../../user';

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

export type UpdateProductCartQuantityResponse = Pick<
  UserType,
  'cart' | 'cart_total'
>;
