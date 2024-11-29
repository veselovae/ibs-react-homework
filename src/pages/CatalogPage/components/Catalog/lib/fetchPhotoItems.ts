import { IProductItem } from "@src/store/model/interfaces";
import { getItemPhoto } from "@src/utils/api";

export const fetchPhotoItems = async (data: IProductItem[]) => {
  const images = await Promise.all(
    data.map((item) => getItemPhoto(item.picture.path)),
  );

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
