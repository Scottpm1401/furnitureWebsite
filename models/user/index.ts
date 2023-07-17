/*********************TYPE & INTERFACE*****************************/

import { ProductCartType } from '../cart';

export enum Gender {
  male = 'MALE',
  female = 'FEMALE',
  other = 'OTHER',
}

export type UserInfoType = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  sex?: Gender;
  avatar?: string;
  address?: AddressType;
};

export type AddressType = {
  country: string;
  city: string;
  state: string;
  line1: string;
  line2?: string;
};

export enum Role {
  user = 'USER',
  admin = 'ADMIN',
  super_admin = 'SUPER_ADMIN',
  owner = 'OWNER',
  shipper = 'SHIPPER',
}

export type UserType = {
  _id: string;
  displayName?: string;
  email: string;
  username: string;
  role: Role;
  birthday: string;
  info?: UserInfoType;
  cart_total: number;
  cart: ProductCartType[];
};
