'use client';

import { useEffect, useState, useMemo } from 'react';
import { useGetScreenSize } from './useGetScreenSize';
import { usePathname } from 'next/navigation';

interface Props {
  pathnames?: string[];
  dynamicPathnames?: string[];
  maxWidth?: number;
  initialValue?: boolean;
}

export const useHideElementWithPathname = ({
  pathnames = [],
  dynamicPathnames = [],
  maxWidth,
  initialValue = false,
}: Props) => {
  const [hidden, setHidden] = useState(initialValue);
  const fullPathname = usePathname();
  const { width } = useGetScreenSize();

  // Memoizar arrays para evitar renders innecesarios
  const memoizedPathnames = useMemo(
    () => pathnames,
    [JSON.stringify(pathnames)]
  );
  const memoizedDynamicPathnames = useMemo(
    () => dynamicPathnames,
    [JSON.stringify(dynamicPathnames)]
  );

  useEffect(() => {
    if (!fullPathname) return;

    let shouldHide = initialValue;

    if (maxWidth && memoizedDynamicPathnames.length) {
      if (
        memoizedDynamicPathnames.some((pattern) =>
          fullPathname.includes(pattern)
        )
      ) {
        shouldHide = width <= maxWidth;
      }
    }

    if (
      memoizedPathnames.length &&
      memoizedPathnames.some((pattern) => fullPathname.includes(pattern))
    ) {
      shouldHide = true;
    }

    if (hidden !== shouldHide) {
      setHidden(shouldHide);
    }
  }, [
    fullPathname,
    width,
    memoizedPathnames,
    memoizedDynamicPathnames,
    maxWidth,
    initialValue,
  ]);

  return hidden;
};
