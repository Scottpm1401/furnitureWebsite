export const STAR_COLOR = 'rgb(255, 188, 11)';
export const CMS_BG_COLOR = 'rgb(245, 245, 245)';
export const BORDER_COLOR = 'rgba(224, 224, 224, 1)';
export const CHART_COLORS_HOVER = [
  '#FF6633',
  '#00B3E6',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
];

export const FORM_BOX_SHADOW =
  'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';

export const CONTACT_EMBED_MAP =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.18099308804!2d106.70323959999999!3d10.797445799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b70447b96d%3A0xb8fb76b0fbcb717f!2zMTQxIMSQLiDEkGnhu4duIEJpw6puIFBo4bunLCBQaMaw4budbmcgMTUsIELDrG5oIFRo4bqhbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1681198876105!5m2!1svi!2s';

export const CHART_COLORS = CHART_COLORS_HOVER.map((color) =>
  color.replace('#', '')
).map(
  (color) =>
    `rgba(${parseInt(color.substring(0, 2), 16)}, ${parseInt(
      color.substring(2, 4),
      16
    )}, ${parseInt(color.substring(4), 16)}, 0.5)`
);

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

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
  resetPassword: '/reset_password',
  not_found: '/404',
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
      create: '/cms/users/create',
      index: (id: string) => `/cms/users/${id}`,
    },
    templates: {
      list: '/cms/templates',
      create: '/cms/templates/create',
      index: (id: string) => `/cms/templates/${id}`,
    },
    subscriptions: {
      list: '/cms/subscriptions',
      index: (id: string) => `/cms/subscriptions/${id}`,
    },
  },
};

export const NOT_AUTH_APP_ROUTES = [
  APP_ROUTES.login,
  APP_ROUTES.signup,
  APP_ROUTES.forgotPassword,
  APP_ROUTES.resetPassword,
];
