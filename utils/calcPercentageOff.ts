export const percentageOff = (oldPrice?: number, newPrice?: number) => {
  return oldPrice && newPrice
    ? Math.round(100 - (newPrice * 100) / oldPrice)
    : 0;
};
