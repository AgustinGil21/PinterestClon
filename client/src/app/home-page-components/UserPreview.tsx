import Link from 'next/link';

interface UserPreviewInterface {
  avatar?: string;
  avatar_background: string;
  username: string;
  avatar_letter_color: string;
  avatar_letter: string;
  name?: string | null;
  surname?: string | null;
}

export const UserPreview = ({
  avatar,
  avatar_background,
  username,
  avatar_letter_color,
  avatar_letter,
  name,
  surname,
}: UserPreviewInterface) => {
  const userURL = `/${username}`;

  return (
    <Link href={userURL} className='user-data'>
      {avatar ? (
        <img src={avatar} alt={`@${username} avatar`} className='user-avatar' />
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
    </Link>
  );
};
