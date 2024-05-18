const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

export const sortSizes = (sizes: { value: string }[]) => {
  return sizes
    .map((size) => size.value)
    .sort((a, b) => {
      if (isNaN(Number(a)) || isNaN(Number(b))) {
        return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
      } else {
        return Number(a) - Number(b);
      }
    });
};
