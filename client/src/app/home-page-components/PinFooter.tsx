import Link from 'next/link';
import { PinInterface } from '../domain/types/pins-structure';
import { PinUserData } from './PinUserData';

export const PinFooter = ({ elem }: { elem: PinInterface }) => {
  const userProfile = `/${elem.username}`;

  return (
    <footer className='card-bottom mt-2'>
      {elem.title && <strong className='dark:text-white'>{elem.title}</strong>}
      <Link
        href={`${userProfile}`}
        className='user-data flex items-center '
        onClick={(e) => e.stopPropagation()}
      >
        <PinUserData elem={elem} />
      </Link>
    </footer>
  );
};
