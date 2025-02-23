import Link from 'next/link';
import { useState, useRef } from 'react';

interface Props {
  href: string;
  holdTime?: number;
  children?: React.ReactNode;
  onHold: () => void;
  onCancelHold?: () => void;
  className?: string;
}

export const HoldableLink = ({
  href,
  holdTime = 300,
  children,
  onHold,
  onCancelHold,
  className,
}: Props) => {
  const [clickDisabled, setClickDisabled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (clickDisabled) e.preventDefault();
  };

  const handleHold = () => {
    timerRef.current = setTimeout(() => {
      setClickDisabled(true);
      onHold();
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
  );
};
