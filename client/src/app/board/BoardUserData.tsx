import LinkNavigate from '../components/Header/LinkNavigate';
import { IUserData } from '../domain/types/boards-interface';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import AvatarUser from '../interfaces/layout/Header/Avatar/AvatarUser';

interface Props {
  user: IUserData;
}

export const BoardUserData = ({ user }: Props) => {
  const { t } = useAppsStore();

  return (
    <LinkNavigate href={`/${user.username}`} classProps='w-fit'>
      <article className='flex gap-2 items-center overflow-hidden'>
        <AvatarUser
          textSize='text-sm'
          data={{
            avatar: user.avatar,
            avatar_letter_color: user.avatar_letter_color,
            avatar_letter: user.avatar_letter,
            avatar_background: user.avatar_background,
          }}
          classProps='w-9 h-9'
        />
        <span> {t?.board.view.by || 'de'} </span>
        <strong className='text-ellipsis'>
          {user.name
            ? `${user.name}${user.surname ? ` ${user.surname}` : ''}`
            : `${user.username}`}
        </strong>
      </article>
    </LinkNavigate>
  );
};
