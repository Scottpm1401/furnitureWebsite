export type SubscriptionType = {
  email: string;
  phone?: string;
  name?: string;
  address?: string;
};

export type SubscribeRequest = Pick<SubscriptionType, 'email'>;
