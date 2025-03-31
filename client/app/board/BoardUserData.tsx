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
      <article className='flex gap-2 items-center overflow-hidden md:text-base text-sm'>
        <AvatarUser
          textSize='text-sm'
          data={{
            avatar: user.avatar,
            avatar_letter_color: user.avatar_letter_color,
            avatar_letter: user.avatar_letter,
            avatar_background: user.avatar_background,
          }}
          classProps='md:w-9 md:h-9 w-8 h-8'
        />
        <span> {t?.board.view.by || 'de'} </span>
        <strong className='text-ellipsis max-w-[150px] overflow-hidden text-nowrap md:max-w-[180px]'>
          {user.name
            ? `${user.name}${user.surname ? ` ${user.surname}` : ''}`
            : `${user.username}`}
        </strong>
      </article>
    </LinkNavigate>
  );
};
