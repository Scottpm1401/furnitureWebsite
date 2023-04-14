export const API = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    CHANGEPASSWORD: '/auth/change_password',
    FORGOTPASSWORD: '/auth/forgot_password',
    RESETPASSWORD: '/auth/reset_password',
  },
  USER: {
    GETUSER: (id: string) => `/user/get/${id}`,
    GETSELF: '/user/getself',
    GETALL: '/user/all',
    UPDATESELF: '/user/update_self',
    DELETEUSER: (id: string) => `/user/delete/${id}`,
    UPDATEUSER: (id: string) => `/user/update/${id}`,
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
    GETTOP10USERS: (month: number) => `/analysis/top_10_users/${month}`,
  },
  TEMPLATE: {
    GETALL: '/template/all',
    GETTEMPLATE: (id: string) => `/template/get/${id}`,
    CREATETEMPLATE: '/template/create',
    UPDATETEMPLATE: (id: string) => `/template/update/${id}`,
    ACTIVETEMPLATE: (id: string) => `/template/active/${id}`,
    DELETETEMPLATE: (id: string) => `/template/delete/${id}`,
    CURRENTTEMPLATE: '/template/current',
  },
  REFRESHTOKEN: '/user/refresh_token',
};
