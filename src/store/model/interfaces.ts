export interface IProductItem {
  id: string;
  name: string;
  description: string;
  info: string;
  details: string;
  like: boolean;
  picture: IProductPicture;
  price: {
    value: number;
    currency: string;
  };
}

interface IProductPicture {
  path: string;
  alt: string;
  img?: string;
}

export interface IState {
  searchParam: string;
  catalogItems: IProductItem[];
}
