import { PinInterface } from '../domain/types/pins-structure';

export const PinUserData = ({ elem }: { elem: PinInterface }) => {
  return (
    <>
      {elem.avatar ? (
        <img
          src={elem.avatar}
          alt={`${elem.avatar} avatar`}
          className='user-avatar w-8 h-8 rounded-full mr-2 object-cover'
        />
      ) : (
        <div
          className='user-avatar w-8 h-8 rounded-full mr-2 flex items-center justify-center'
          style={{
            backgroundColor: elem.avatar_background,
            color: elem.avatar_letter_color,
          }}
          aria-label={`${elem.username} avatar`}
        >
          {elem.avatar_letter}
        </div>
      )}
      <span className='text-sm dark:text-white'>
        {elem.name ? `${elem.name} ${elem.surname || ''}` : `${elem.username}`}
      </span>
    </>
  );
};
