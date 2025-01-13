export const isSpaceAvailable = (
  availableSpace: number,
  modalSize: number,
  parentPadding: number
) => {
  return availableSpace - modalSize > 0 && availableSpace >= parentPadding;
};
