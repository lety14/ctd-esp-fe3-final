export const percentageOff = (oldPrice?: number, newPrice?: number) => {
  if (oldPrice && newPrice) {
    return Math.round(100 - (newPrice * 100) / oldPrice);
  }
  return 0;
};
