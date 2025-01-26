import { useGetUserResolution } from './useGetUserResolution';

interface Props {
  elementMaxWidth: number;
  elementMinHeight: number;
  parentPadding?: number;
  elementsGap?: number;
}

export const useGetLimit = ({
  elementMaxWidth,
  elementMinHeight,
  parentPadding = 8,
}: Props) => {
  const { width, height } = useGetUserResolution();

  // Acá se calculan cuantos elementos del mismo
  // tipo entran en la resolución de pantalla del
  // usuario.

  const screenResolution = width * height;
  const elementArea = elementMaxWidth * elementMinHeight;
  const totalPadding = parentPadding * 4;

  const limit = Math.ceil((screenResolution - totalPadding) / elementArea);

  return limit || 25;
};
