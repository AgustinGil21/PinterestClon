import { Icons } from './IconsInterface';

const SearchIcon = ({ pathClassName }: Icons) => {
  return (
    <svg
      aria-label='Ícono de búsqueda'
      className='BNH gUZ U9O kVc'
      height='13'
      role='img'
      viewBox='0 0 24 24'
      width='13'
    >
      <path
        fill='gray'
        d='M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24'
        className={`${pathClassName}`}
      ></path>
    </svg>
  );
};

export default SearchIcon;
