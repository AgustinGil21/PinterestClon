export const getUniqueItems = <T extends { pin_id: string }>(
  newItems: T[],
  existingItems: T[]
): T[] => {
  return newItems.filter(
    (newItem) =>
      !existingItems.some(
        (existingItem) => existingItem.pin_id === newItem.pin_id
      )
  );
};
