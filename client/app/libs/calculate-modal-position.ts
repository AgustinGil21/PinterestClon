interface IParams {
  x: number;
  y: number;
  btnWidth: number;
  btnHeight: number;
  modalWidth: number;
  modalHeight: number;
  padding?: number;
}

export const calculateModalPosition = ({
  x = 0,
  y = 0,
  btnWidth = 0,
  btnHeight = 0,
  modalWidth = 0,
  modalHeight = 0,
  padding = 10,
}: IParams) => {
  const { innerWidth, innerHeight } = window;

  // Calcula el eje horizontal para saber si
  // la modal entra o no.
  const posX =
    x + modalWidth + padding > innerWidth
      ? x - modalWidth - padding
      : x + btnWidth + padding;

  // Calcula el eje vertical para saber si
  // la modal entra o no.
  const posY =
    y + modalHeight + padding > innerHeight
      ? y - modalHeight - padding
      : y + btnHeight + padding;

  return { top: posY, left: posX };
};
