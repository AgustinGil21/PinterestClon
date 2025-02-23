import { useState, useRef } from 'react';
import { useGetScreenSize } from '@/app/hooks/useGetScreenSize';
import Link from 'next/link';
import LinkNavigate from './LinkNavigate';

interface Props {
  href: string;
  holdTime?: number;
  children?: React.ReactNode;
  onHold: (e: React.MouseEvent | React.TouchEvent) => void;
  onCancelHold?: () => void;
  className?: string;
  maxWidth?: number;
}

export const HoldableLink = ({
  href,
  holdTime = 300,
  children,
  onHold,
  onCancelHold,
  className,
  maxWidth,
}: Props) => {
  const [clickDisabled, setClickDisabled] = useState(false);
  const { width } = useGetScreenSize();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (clickDisabled) e.preventDefault();
  };

  const handleHold = (e: React.MouseEvent | React.TouchEvent) => {
    timerRef.current = setTimeout(() => {
      setClickDisabled(true);
      onHold(e);
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
          onTouchEnd={handleCancelHold}
          className={className}
        >
          {children}
        </Link>
      )}
    </>
  );
};
