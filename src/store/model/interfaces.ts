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

export type catalogType = Record<IProductItem["id"], IProductItem>;

interface IProductPicture {
  path: string;
  alt: string;
  img?: string;
}

export interface IState {
  catalogItems: catalogType;
}
