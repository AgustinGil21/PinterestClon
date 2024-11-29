import { Icons } from '@/app/components/icons/IconsInterface';

const LinkedinIcon = ({ svgClassName, pathClassName }: Icons) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='19'
      height='19'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className={`icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin ${svgClassName}`}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='' />
      <path
        d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z'
        className={`${pathClassName}`}
      />
      <path d='M8 11l0 5' className={`${pathClassName}`} />
      <path d='M8 8l0 .01' className={`${pathClassName}`} />
      <path d='M12 16l0 -5' className={`${pathClassName}`} />
      <path d='M16 16v-3a2 2 0 0 0 -4 0' className={`${pathClassName}`} />
    </svg>
  );
};

export default LinkedinIcon;
