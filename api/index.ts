export const API = {
  USER: {
    LOGIN: '/user/login',
    SIGNUP: '/user/signup',
    LOGOUT: '/user/logout',
    GETUSER: (id: string) => `/user/get/${id}`,
    GETSELF: '/user/getself',
    GETALL: '/user/all',
    UPDATESELF: '/user/update_self',
    DELETEUSER: (id: string) => `/user/delete/${id}`,
    UPDATEUSER: (id: string) => `/user/update/${id}`,
  },
  PRODUCT: {
    GETFEATURED: '/product/featured',
    GETALL: '/product/all',
    GETPRODUCT: (id: string) => `/product/get/${id}`,
    CREATEPRODUCT: '/product/create',
    UPDATEPRODUCT: (id: string) => `/product/update/${id}`,
    DELETEPRODUCT: (id: string) => `/product/delete/${id}`,
    RATINGPRODUCT: (id: string) => `/product/rating/${id}`,
  },
  PAYMENT: {
    CHECKOUT: '/payment/checkout',
    CONFIRM: '/payment/confirm',
  },
  REFRESHTOKEN: '/user/refreshToken',
};