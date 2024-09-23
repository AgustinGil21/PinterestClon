interface PinFooterInterface {
  title?: string;
  avatar?: string;
  username: string;
  avatar_background: string;
  avatar_letter_color: string;
  avatar_letter: string;
  name?: string | null;
  surname?: string | null;
  url?: string;
}

export const PinFooter = ({
  title,
  avatar,
  username,
  avatar_background,
  avatar_letter_color,
  avatar_letter,
  name,
  surname,
  url,
}: PinFooterInterface) => {
  const userURL = `${username}`;

  return (
    <footer className='card-bottom'>
      {title && <strong>{title}</strong>}
      <a href={url} className='user-data'>
        {avatar ? (
          <img
            src={avatar}
            alt={`@${username} avatar`}
            className='user-avatar'
          />
        ) : (
          <div
            className='user-avatar'
            style={{
              backgroundColor: avatar_background,
              color: avatar_letter_color,
            }}
          >
            {avatar_letter}
          </div>
        )}

        {name ? <span>{`${name} ${surname}`}</span> : <span>{username}</span>}
      </a>
    </footer>
  );
};
