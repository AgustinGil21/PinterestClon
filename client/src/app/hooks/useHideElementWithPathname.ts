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
  const pathname = usePathname();
  const { width } = useGetScreenSize();

  useEffect(() => {
    if (!pathname) return;

    let shouldHide = initialValue;

    if (maxWidth && dynamicPathnames?.length) {
      if (dynamicPathnames.includes(pathname)) {
        shouldHide = width <= maxWidth;
      }
    }

    if (pathnames?.length && pathnames.includes(pathname)) {
      shouldHide = true;
    }

    setHidden(shouldHide);
  }, [pathname, width, pathnames, dynamicPathnames, maxWidth, initialValue]);

  return hidden;
};
