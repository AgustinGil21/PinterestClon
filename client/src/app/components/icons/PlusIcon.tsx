import { Icons } from './IconsInterface';

const PlusIcon = ({
  svgClassName,
  pathClassName,
  strokeWidth = 3.5,
}: Icons) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      className={`size-6 ${svgClassName}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 4.5v15m7.5-7.5h-15'
        className={`${pathClassName}`}
      />
    </svg>
  );
};

export default PlusIcon;
