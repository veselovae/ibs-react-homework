// export const debounce = (callback, delay) => {
//   let timeout;
//   return function () {
//     clearTimeout(timeout);
//     timeout = setTimeout(callback, delay);
//   };
// };

export function debounce(cb, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// export const toggleFavoriteIcon = (data, id) => {
//   const newData = [...data];
//   const item = data.find((item) => item.id === id);
//   const itemIndex = data.findIndex((item) => item.id === id);
//   item.like = !item.like;
//   newData[itemIndex] = item;
//   return newData;
// };

export const filterCatalogItems = (data, searchParam) => {
  return data.filter(({ name }) => {
    return name === searchParam;
  });
};
