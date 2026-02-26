export const unitsConverter = (value: number) => {
  if (process.env.PLATFORM === "desktop") return `${value / 16}rem`;
  return `${value}px`;
};

export const generateId = () => (Math.random() + 1).toString(36).substring(7)