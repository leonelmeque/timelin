export const distanceBetweenDates = (first: string, second: string) => {
  const d1 = new Date(first).getTime();
  const d2 = new Date(second).getTime();

  return Math.floor((d2 - d1) / (24 * 3600 * 1000));
};
