import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PinInterface } from '../domain/types/pins-structure';
import getDarkColor from '../interfaces/helpers/getColorDark';
import { getDomain } from '../libs/getDomain';
import { useRouter } from 'next/navigation';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ModalShareAccount from '../user-profile/ModalShareAccount';
import useCloseModal from '../hooks/useCloseModal';

export const Pin = ({
  body,
  title,
  url,
  adult_content,
  pin_id,
  alt_text,
  name,
  surname,
  avatar,
  username,
  avatar_background,
  avatar_letter_color,
  avatar_letter,
  className,
}: PinInterface) => {
  const {
    pinData,
    getPinView,
    openDownloadAccountModal,
    isDownloadAccountOpen,
  } = useAppsStore();
  const { modalRef } = useCloseModal({ setModal: openDownloadAccountModal });
  const [isLoaded, setIsLoaded] = useState(false);
  const [skeletonColor, setSkeletonColor] = useState<string>('#');
  const buttonURL = getDomain(url);
  const userProfile = `/${username}`;
  const router = useRouter();

  useEffect(() => {
    setSkeletonColor(getDarkColor());
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = body;
    img.onload = () => setIsLoaded(true);
  }, [body]);

  const handleClick = () => {
    const fetchData = async () => {
      try {
        // await getPinView(pin_id);
        router.push(`pin/${pin_id}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleClickOpenMenu = () => {
    openDownloadAccountModal();
  };

  return (
    <section className={`${className}`}>
      {!isLoaded && username ? (
        <div className='animate-pulse p-0.5'>
          <div
            className=' h-[320px] w-full mb-4 rounded-2xl my-3'
            style={{
              backgroundColor: skeletonColor,
            }}
          ></div>
        </div>
      ) : (
        <article className='card hover:cursor-pointer'>
          <article className='card-top'>
            <img
              src={body}
              className='card-body w-full h-60 object-cover'
              alt={alt_text}
              onClick={handleClick}
            />
            <article className='top card-controls flex justify-between mt-2'>
              <button className='save-button bg-red-500 text-white px-3 py-1 rounded'>
                Guardar
              </button>
              <button className='save-to-board-button flex items-center'>
                <span className='text-sm'>Programacion</span>
                <svg
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4 ml-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m19.5 8.25-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </button>
              <button className='hidden transition-[colors,scale] save-to-board-button-sm p-3 rounded-full bg-transparent justify-center items-center '>
                <svg
                  fill='none'
                  viewBox='0 0 20 20'
                  strokeWidth='2'
                  stroke='white'
                  className='w-4 h-4 -translate-x-0.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m19.5 8.25-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </button>
            </article>

            <article className='bottom card-controls flex justify-between items-center mt-2'>
              <div className='flex gap-2 flex-row-reverse'>
                <button className='circle-buttons bg-gray-100 p-2 rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-6 h-6 min-h-6 min-w-6'
                  >
                    <path d='M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z' />
                  </svg>
                </button>

                <button className='circle-buttons bg-gray-100 p-2 rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-4 h-4 min-h-4 min-w-4'
                  >
                    <path d='M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z' />
                    <path d='M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z' />
                  </svg>
                </button>
              </div>

              {url && (
                <a
                  href={url}
                  className='go-to text-blue-500'
                  title={buttonURL || ''}
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>{buttonURL}</span>
                </a>
              )}
            </article>
          </article>
          {username && (
            <footer className='card-bottom mt-2'>
              {title && <strong className='dark:text-white'>{title}</strong>}
              <Link
                href={`${userProfile}`}
                className='user-data flex items-center '
                onClick={(e) => e.stopPropagation()}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`${username} avatar`}
                    className='user-avatar w-8 h-8 rounded-full mr-2 object-cover'
                  />
                ) : (
                  <div
                    className='user-avatar w-8 h-8 rounded-full mr-2 flex items-center justify-center'
                    style={{
                      backgroundColor: avatar_background,
                      color: avatar_letter_color,
                    }}
                    aria-label={`${username} avatar`}
                  >
                    {avatar_letter}
                  </div>
                )}
                <span className='text-sm dark:text-white'>
                  {name ? `${name} ${surname}` : `${username}`}
                </span>
              </Link>
            </footer>
          )}
        </article>
      )}
    </section>
  );
};
