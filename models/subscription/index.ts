export type SubscriptionType = {
  _id: string;
  email: string;
  phone?: string;
  name?: string;
  address?: string;
};

export type SubscribeRequest = Pick<SubscriptionType, 'email'>;
