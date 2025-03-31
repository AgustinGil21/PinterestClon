import { useEffect, useState } from 'react';

export const useGetElementSize = (elementRef: React.RefObject<any>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const element = elementRef.current;

  const handleResize = () => {
    setWidth(element.getBoundingClientRect().width);
    setHeight(element.getBoundingClientRect().height);
  };

  useEffect(() => {
    if (!element) return;

    setWidth(element.getBoundingClientRect().width);
    setHeight(element.getBoundingClientRect().height);

    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  return { width, height };
};
