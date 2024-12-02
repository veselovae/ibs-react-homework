import { IProductItem } from "@src/store/model/interfaces";
import { getItemPhoto } from "@src/utils/api";

export const fetchItemPhoto = async (item: IProductItem) => {
  const itemImg = await getItemPhoto(item.picture.path);

  return {
    ...item,
    picture: {
      ...item.picture,
      img: itemImg,
    },
  };
};
