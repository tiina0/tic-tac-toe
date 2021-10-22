import isSubset from "../src/isSubset.mjs";

test("isSubset should return true when all elements from the second array are present in the first one.", () => {
  expect(isSubset([1, 2, 3], [1, 2])).toBe(true);
});

test("isSubset should return false when at least one element from the second array is not present in the first one.", () => {
  expect(isSubset([1, 2, 3], [1, 2, 999])).toBe(false);
});

test("isSubset should return false when the first array is empty.", () => {
  expect(isSubset([], [1, 2, 999])).toBe(false);
});

test("isSubset should return true when the second array is empty.", () => {
  expect(isSubset([1], [])).toBe(true);
});
