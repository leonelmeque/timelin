import { distanceBetweenDates } from "../../../src/lib/utils/distance-between-dates";

test("Given two dates return the distance between the two", () => {
  const distance = distanceBetweenDates("10/10/2010", "10/10/2023");
  expect(distance).toBe(4748);
});
