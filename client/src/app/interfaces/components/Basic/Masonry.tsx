import { useMobileIsScrolling } from '@/app/hooks/useMobileIsScrolling';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';

interface Props {
  children?: React.ReactNode;
  small?: boolean;
  className?: string;
}

export const Masonry = ({ children, small = false, className }: Props) => {
  const { setMasonryMobileStopScrolling } = useAppsStore();
  const { handleTouchEnd, handleTouchMove } = useMobileIsScrolling(
    setMasonryMobileStopScrolling
  );

  return (
    <section
      className={`${small ? 'masonry-small' : 'masonry'} ${className}`}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </section>
  );
};

export default Masonry;
