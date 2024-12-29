import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  tooltipText: string;
  isVisible?: boolean;
}

const Tooltip = ({ children, tooltipText, isVisible }: TooltipProps) => {
  const { isDownloadAccountOpen } = useAppsStore();

  if (isVisible) {
    return <div className='p-1'>{children}</div>;
  }

  return (
    <div
      className={`relative group ${
        isDownloadAccountOpen ? 'z-[51]' : 'z-[20]'
      }  p-1`}
    >
      {children}
      <div className='absolute right-1 top-9 text-nowrap mb-2  p-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        {tooltipText}
      </div>
    </div>
  );
};

export default Tooltip;
