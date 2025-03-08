import { useState, useRef } from 'react';
import { useGetScreenSize } from '@/app/hooks/useGetScreenSize';
import Link from 'next/link';
import LinkNavigate from './LinkNavigate';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface Props {
  href: string;
  holdTime?: number;
  children?: React.ReactNode;
  onHold: (e: React.MouseEvent | React.TouchEvent) => void;
  onCancelHold?: () => void;
  className?: string;
  maxWidth?: number;
  setIsHolding?: (isHolding: boolean) => void;
}

export const HoldableLink = ({
  href,
  holdTime = 600,
  children,
  onHold,
  onCancelHold,
  className,
  maxWidth,
  setIsHolding,
}: Props) => {
  const [clickDisabled, setClickDisabled] = useState(false);
  const { width } = useGetScreenSize();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { masonryMobileStopScrolling } = useAppsStore();

  const handleClick = (e: React.MouseEvent) => {
    if (clickDisabled) e.preventDefault();
  };

  const handleHold = (e: React.MouseEvent | React.TouchEvent) => {
    if (!masonryMobileStopScrolling) return;

    timerRef.current = setTimeout(() => {
      setClickDisabled(true);
      onHold(e);
      if (setIsHolding) setIsHolding(true);
    }, holdTime);
  };

  const handleCancelHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setTimeout(() => {
      setClickDisabled(false);
    }, 50);

    if (onCancelHold) onCancelHold();
    if (setIsHolding) setIsHolding(false);
  };

  const handleTouchEnd = () => {
    if (setIsHolding) setIsHolding(false);
  };

  return (
    <>
      {maxWidth && maxWidth < width ? (
        <LinkNavigate href={href} classProps={className}>
          {children}
        </LinkNavigate>
      ) : (
        <Link
          href={href}
          onClick={handleClick}
          onMouseDown={handleHold}
          onMouseUp={handleCancelHold}
          onTouchStart={handleHold}
          onTouchEnd={handleTouchEnd}
          className={className}
        >
          {children}
        </Link>
      )}
    </>
  );
};
