export const unitsConverter = (value: number) => {
    if (process.env.PLATFORM === "desktop") return `${value / 16}rem`;
    return `${value}px`
}