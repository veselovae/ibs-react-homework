import { IProductItem } from "@src/store/model/interfaces";

export const debounce = <T>(callback: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: T[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const processResponse = (response: IProductItem): IProductItem => {
  return {
    ...response,
    name: response?.name ?? "Название",
    description: response?.description ?? "",
    details: response?.details ?? "",
    price: {
      ...response.price,
      value: response?.price?.value ?? "",
    },
  };
};
