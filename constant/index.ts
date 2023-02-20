export const STAR_COLOR = 'rgb(255, 188, 11)';
export const CMS_BG_COLOR = 'rgb(245, 245, 245)';

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
  cms: '/cms',
  cmsOrdered: '/cms/ordered',
  cmsProducts: '/cms/products',
  cmsSettings: '/cms/settings',
  cmsUsers: '/cms/users',
};
