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
    <Link href={userURL} className='flex items-center gap-[8px] cursor-pointer'>
      {avatar ? (
        <img
          src={avatar}
          alt={`@${username} avatar`}
          className='min-w-[32px] min-h-[32px] w-[32px] h-[32px] rounded-full flex items-center justify-center font-bold'
        />
      ) : (
        <div
          className='min-w-[32px] min-h-[32px] w-[32px] h-[32px] rounded-full flex items-center justify-center font-bold'
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
