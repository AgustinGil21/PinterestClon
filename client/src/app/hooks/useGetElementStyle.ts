import { useEffect, useState } from 'react';

const useGetElementStyles = (
  element: React.RefObject<HTMLElement>,
  properties: string[]
) => {
  const [styles, setStyles] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!element.current) return;

    const computedStyles = window.getComputedStyle(element.current);

    const stylesObject = properties.reduce((acc, property) => {
      acc[property] =
        parseFloat(computedStyles.getPropertyValue(property)) || 0;
      return acc;
    }, {} as Record<string, number>);

    setStyles(stylesObject);
  }, [element, properties]);

  return styles;
};

export default useGetElementStyles;
