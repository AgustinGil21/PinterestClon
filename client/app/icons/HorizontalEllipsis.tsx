import { IconsInterface } from './icons-interface';

export const HorizontalEllipsisIcon = ({ classProps }: IconsInterface) => {
  return (
    <svg viewBox='0 0 20 20' fill='currentColor' className={classProps}>
      <path d='M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z' />
    </svg>
  );
};
