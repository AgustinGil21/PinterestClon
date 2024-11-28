import { Icons } from './IconsInterface';

const ClockIcon = ({ strokeWidth = 3.5, svgClassName }: Icons) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      className={svgClassName}
    >
      <path
        fill='none'
        stroke='black'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
        d='M4 18A10 10 0 1 0 2.9 7.9M2 4v4h4m6-1v5l3 3'
      ></path>
    </svg>
  );
};

export default ClockIcon;
