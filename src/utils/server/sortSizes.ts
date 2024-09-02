const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

export const sortSizes = (sizes: string[]) => {
  return sizes
    .map((size) => size)
    .sort((a, b) => {
      if (isNaN(Number(a)) || isNaN(Number(b))) {
        return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
      } else {
        return Number(a) - Number(b);
      }
    });
};
