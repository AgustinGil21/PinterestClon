import { Icons } from '../../../components/icons/IconsInterface';

const AnswerIcon = ({ svgClassName, pathClassName }: Icons) => {
  return (
    <svg
      aria-hidden='true'
      aria-label=''
      className={`Uvi gUZ U9O kVc ${svgClassName}`}
      height='20'
      role='img'
      viewBox='0 0 24 24'
      width='20'
      fill='#1111111'
    >
      <path
        d='M14.5 21.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.25-14.75a6.7 6.7 0 0 1-3.26 5.78c-.46.26-1.14 1.33-1.14 2.34a2.35 2.35 0 1 1-4.7 0c0-2.55 1.47-5.25 3.5-6.41.45-.26.9-.93.9-1.71a2.06 2.06 0 0 0-4.1 0 2.35 2.35 0 1 1-4.7 0 6.76 6.76 0 0 1 13.5 0'
        className={`${pathClassName}`}
      ></path>
    </svg>
  );
};

export default AnswerIcon;
