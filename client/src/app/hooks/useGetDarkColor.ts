import { useEffect, useState } from 'react';
import getDarkColor from '../interfaces/helpers/getColorDark';

export const useGetDarkColor = () => {
  const [color, setColor] = useState<string>('#');

  useEffect(() => {
    setColor(getDarkColor());
  }, []);

  return color;
};
