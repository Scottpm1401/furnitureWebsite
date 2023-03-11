export const STAR_COLOR = 'rgb(255, 188, 11)';
export const CMS_BG_COLOR = 'rgb(245, 245, 245)';
export const BORDER_COLOR = 'rgba(224, 224, 224, 1)';

export const APP_ROUTES = {
  home: '/',
  about: '/about',
  login: '/login',
  cart: '/cart',
  checkout: '/cart/checkout',
  ordered: '/ordered',
  products: '/products',
  product: (id: string) => `/products/${id}`,
  profile: '/profile',
  additionalInfo: '/profile/additional_info',
  authentication: '/profile/authentication',
  signup: '/signup',
  forgotPassword: '/forgot_password',
  contact: '/contact',
  termAndCondition: '/legal/terms_and_conditions',
  privacyPolicy: '/legal/privacy_policy',
  cms: {
    dashboard: '/cms',
    ordered: {
      list: '/cms/ordered',
      create: '/cms/ordered/create',
      index: (id: string) => `/cms/ordered/${id}`,
    },
    products: {
      list: '/cms/products',
      create: '/cms/products/create',
      index: (id: string) => `/cms/products/${id}`,
    },
    users: {
      list: '/cms/users',
      create: '/cms/create',
      index: (id: string) => `/cms/users/${id}`,
    },
    settings: '/cms/settings',
  },
};
