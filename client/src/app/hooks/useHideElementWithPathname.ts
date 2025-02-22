'use client';

import { useEffect, useState } from 'react';
import { useGetScreenSize } from './useGetScreenSize';
import { usePathname } from 'next/navigation';

interface Props {
  pathnames?: string[];
  dynamicPathnames?: string[];
  maxWidth?: number;
  initialValue?: boolean;
}

export const useHideElementWithPathname = ({
  pathnames,
  initialValue = false,
  maxWidth,
  dynamicPathnames,
}: Props) => {
  const [hidden, setHidden] = useState(initialValue);
  const fullPathname = usePathname();
  const { width } = useGetScreenSize();

  useEffect(() => {
    if (!fullPathname) return;

    let shouldHide = initialValue;

    if (maxWidth && dynamicPathnames?.length) {
      if (dynamicPathnames.some((pattern) => fullPathname.includes(pattern))) {
        shouldHide = width <= maxWidth;
      }
    }

    if (
      pathnames?.length &&
      pathnames.some((pattern) => fullPathname.includes(pattern))
    ) {
      shouldHide = true;
    }

    setHidden(shouldHide);
  }, [
    fullPathname,
    width,
    pathnames,
    dynamicPathnames,
    maxWidth,
    initialValue,
  ]);

  return hidden;
};
