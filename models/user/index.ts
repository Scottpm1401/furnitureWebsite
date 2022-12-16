/*********************TYPE & INTERFACE*****************************/

export enum Gender {
  male = 'MALE',
  female = 'FEMALE',
  other = 'OTHER',
}

export type UserInfoType = {
  first_name: string;
  last_name: string;
  phone: string;
  sex: Gender;
  avatar?: string;
  address: AddressType;
};

export type AddressType = {
  country: string;
  city: string;
  state: string;
  line1: string;
  line2?: string;
};

export type UserType = {
  _id: string;
  displayName?: string;
  email: string;
  username: string;
  role: 'ADMIN' | 'USER';
  birthday: string;
  info?: UserInfoType;
};
