export const enumerable = (start: number, end: number): number[] => {
  let index = 0;
  const result: number[] = [];
  while (start <= end) {
    result[index++] = start++;
  }

  return result;
};
