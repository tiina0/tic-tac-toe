export default function isSubset(array1, array2) {
  return array2.every((element) => {
    return array1.includes(element);
  });
}
