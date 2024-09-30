import Link from 'next/link';
import { PinInterface } from '../domain/types/pins-structure';
import { PinFooter } from './PinFooter';
import { PinTop } from './PinTop';

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
}: PinInterface) => {
  const gotoButtonURL = url?.split('//')[1]?.split('/' || '?')[0];
  const userProfile = `/${username}`;

  return (
    // <section
    //   className='flex flex-col p-0 m-0 w-[236px] break-before-avoid cursor-zoom-in'
    //   id={pin_id}
    // >
    //   <PinTop body={body} url={url} alt_text={alt_text} />

    //   <PinFooter
    //     name={name}
    //     surname={surname}
    //     username={username}
    //     avatar_background={avatar_background}
    //     avatar_letter={avatar_letter}
    //     avatar_letter_color={avatar_letter_color}
    //     avatar={avatar}
    //     title={title}
    //   />
    // </section>
    <section className='card'>
      <article className='card-top'>
        <img src={body} className='card-body' alt={alt_text} />
        <article className='top card-controls'>
          <button className='save-button'>Guardar</button>

          <button className='save-to-board-button'>
            <span>Programacion</span>
            <svg
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
              />
            </svg>
          </button>
        </article>

        <article className='bottom card-controls'>
          {/* More options button */}
          <div className='rounded-buttons'>
            <button className='circle-buttons ellipsis'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='size-5'
              >
                <path d='M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z' />
              </svg>
            </button>

            {/* Share button */}
            <button className='circle-buttons tray'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='size-5'
              >
                <path d='M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z' />
                <path d='M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z' />
              </svg>
            </button>
          </div>

          {url && (
            <a href={url} className='go-to' title={gotoButtonURL}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='size-5'
              >
                <path
                  fillRule='evenodd'
                  d='M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z'
                  clipRule='evenodd'
                />
              </svg>
              <span>{gotoButtonURL}</span>
            </a>
          )}
        </article>
      </article>
      <footer className='card-bottom'>
        {title && <strong>{title}</strong>}
        <Link href={userProfile} className='user-data'>
          {avatar ? (
            <img
              src={avatar}
              alt={`${username} avatar`}
              className='user-avatar'
            />
          ) : (
            <div
              className='user-avatar'
              style={{
                backgroundColor: `${avatar_background}`,
                color: `${avatar_letter_color}`,
              }}
              aria-label={`${username} avatar`}
            >
              {avatar_letter}
            </div>
          )}
          <span>{name ? `${name} ${surname}` : `${username}`}</span>
        </Link>
      </footer>
    </section>
  );
};
