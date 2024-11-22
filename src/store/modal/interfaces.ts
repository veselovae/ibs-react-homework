export interface Iterfaces {
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
  img?: Blob;
}

export interface IState {
  searchParams: string;
  catalogItems: Iterfaces[];
}

export interface IAction {
  type: string;
  payload: Iterfaces[] | string;
}
