export type RatingType = {
  rate: number;
  num_of_rate: number;
};

export type ReviewType = {
  user_id: string;
  username: string;
  email: string;
  phone?: string;
};

export type ProductType = {
  _id: string;
  img: string;
  gallery: string[];
  title: string;
  description?: string;
  category: string;
  brand: string;
  rating?: RatingType;
  review?: ReviewType[];
  price: number;
  sku: string;
  storage_quantity: number;
  colors: ProductColor[];
};

export enum ProductCategory {
  OFFICE = 'office',
  LIVING_ROOM = 'living_room',
  KITCHEN = 'kitchen',
  BEDROOM = 'bedroom',
  DINING = 'dining',
  KIDS = 'kids',
}

export enum ProductSort {
  price_asc = 'PRICE_ASC',
  price_des = 'PRICE_DES',
  name_asc = 'NAME_ASC',
  name_des = 'NAME_DES',
}

export enum ProductBrand {
  IKEA = 'ikea',
  ASHLEY = 'ashley',
  MAISONS_DU_MONDE = 'maisons_du_monde',
  HABITAT = 'habitat',
  WILLIAMS_SONOMA = 'williams_sonoma',
}

export enum ProductColor {
  RED = 'red',
  LIME = 'lime',
  BLUE = 'blue',
  BLACK = 'black',
  ORANGE = 'orange',
}

export type Filter = {
  offset: number;
  limit: number;
  title?: string;
  category?: ProductCategory;
  brand?: string;
  color?: string;
  price?: number;
  sort?: ProductSort;
};
