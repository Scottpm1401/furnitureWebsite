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
    CHANGEPASSWORD: '/user/change_password',
    ADDTOCART: '/user/cart/add',
    REMOVEFROMCART: '/user/cart/remove',
    UPDATECARTQUANTITY: '/user/cart/update_quantity',
    CLEARCART: '/user/cart/clear',
  },
  PRODUCT: {
    GETFEATURED: '/product/featured',
    GETALL: '/product/all',
    GETCMSALL: '/product/cms_all',
    GETPRODUCT: (id: string) => `/product/get/${id}`,
    CREATEPRODUCT: '/product/create',
    UPDATEPRODUCT: (id: string) => `/product/update/${id}`,
    DELETEPRODUCT: (id: string) => `/product/delete/${id}`,
    RATINGPRODUCT: (id: string) => `/product/rating/${id}`,
  },
  PAYMENT: {
    CHECKOUT: '/payment/checkout',
    CONFIRM: '/payment/confirm',
    CHECK: (id: string) => `/payment/check/${id}`,
  },
  UPLOAD: {
    SIGNATURE: '/upload/signature',
  },
  ORDERED: {
    GETSELF: '/ordered/getself',
    GETALL: '/ordered/all',
    GETORDERD: (id: string) => `/ordered/get/${id}`,
    UPDATEORDERD: (id: string) => `/ordered/update/${id}`,
  },
  ANALYSIS: {
    GETREVENUEPERMONTH: '/analysis/months_revenue',
    GETBOUGHTPRODUCTS: (month: number) =>
      `/analysis/products_purchase/${month}`,
  },
  REFRESHTOKEN: '/user/refreshToken',
};
