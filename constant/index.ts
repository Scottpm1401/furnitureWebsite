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
  },
};
