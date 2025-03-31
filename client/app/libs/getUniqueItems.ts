export const getUniqueItems = <T extends Record<string, any>>(
  newItems: T[],
  existingItems: T[],
  key: keyof T
): T[] => {
  return newItems.filter(
    (newItem) =>
      !existingItems.some((existingItem) => existingItem[key] === newItem[key])
  );
};
