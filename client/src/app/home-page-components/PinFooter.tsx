import { useRef } from 'react';
import Link from 'next/link';
import { PinInterface } from '../domain/types/pins-structure';
import { PinUserData } from './PinUserData';
import { AdultContentText } from './AdultContentText';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { FaEllipsis } from 'react-icons/fa6';
import { useGetScreenSize } from '../hooks/useGetScreenSize';

export const PinFooter = ({ elem }: { elem: PinInterface }) => {
  const userProfile = `/${elem.username}`;
  const { width } = useGetScreenSize();
  const ellipsisBtnRef = useRef(null);
  const { isAuth, setPinMoreOptionsModal, openRegisterModal } = useAppsStore();

  const handleClickOpenModalThreePoints = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }

    setPinMoreOptionsModal(ellipsisBtnRef, elem.body, elem.pin_id || '');
  };

  return (
    <footer className='card-bottom'>
      {elem.adult_content && elem.title ? (
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
        <div className='flex w-full justify-between items-center'>
          {elem.title && (
            <strong
              className={`dark:text-white ${
                elem.adult_content ? 'invisible' : ''
              }`}
            >
              {elem.title}
            </strong>
          )}
          {width < 769 && (
            <>
              <span></span>
              <button
                ref={ellipsisBtnRef}
                className='w-[32px] h-[32px] min-w-[32px] min-h-[32px] flex justify-center items-center rounded-full hover:bg-[#f4f4f4] transition-colors'
                onClick={handleClickOpenModalThreePoints}
              >
                <FaEllipsis size={15} className='rotate-90' />
              </button>
            </>
          )}
        </div>
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
