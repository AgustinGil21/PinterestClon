import Link from 'next/link';
import { PinInterface } from '../domain/types/pins-structure';
import { PinUserData } from './PinUserData';
import { AdultContentText } from './AdultContentText';

export const PinFooter = ({ elem }: { elem: PinInterface }) => {
  const userProfile = `/${elem.username}`;

  return (
    <footer className='card-bottom mt-2'>
      {elem.title && (
        <>
          {elem.adult_content ? (
            <div className={`relative ${elem.adult_content ? 'mb-2' : ''}`}>
              {elem.adult_content && <AdultContentText />}
              <strong
                className={`dark:text-white ${
                  elem.adult_content ? 'invisible' : ''
                }`}
              >
                {elem.title}
              </strong>
            </div>
          ) : (
            <strong
              className={`dark:text-white ${
                elem.adult_content ? 'invisible' : ''
              }`}
            >
              {elem.title}
            </strong>
          )}
        </>
      )}
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
