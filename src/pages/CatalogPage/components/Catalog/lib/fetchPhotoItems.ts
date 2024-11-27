import { IProductItem } from "@src/store/model/interfaces";
import { getItemPhoto } from "@src/utils/api";

export const fetchPhotoItems = async (data: IProductItem[]) => {
  const arrOfPromises = data.map((item) => getItemPhoto(item.picture.path));
  const images = await Promise.all(arrOfPromises);
  return data.map(
    (item, index): IProductItem => ({
      ...item,
      picture: {
        ...item.picture,
        img: images[index],
      },
    }),
  );
};
