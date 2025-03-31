import LinkNavigate from '../components/Header/LinkNavigate';
import { IPinBoard } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface Props {
  savedInProfile?: boolean;
  username?: string;
  board?: IPinBoard;
  pinCard: boolean;
}

export const PinAlreadySaved = ({
  savedInProfile,
  board,
  username,
  pinCard,
}: Props) => {
  const { t } = useAppsStore();

  let content = savedInProfile
    ? t?.['boards-list'].profile || 'Profile'
    : board?.name;
  let url = savedInProfile ? `/${username}` : `/board/${board?.id}`;

  return (
    <LinkNavigate
      href={url}
      classProps='flex items-center mr-2 max-w-[90px] overflow-hidden'
    >
      <span
        title={content}
        className={`hover:underline ${
          pinCard ? 'text-black' : 'text-white'
        } font-semibold text-base pl-2 text-nowrap text-ellipsis overflow-hidden w-full`}
      >
        {content}
      </span>
    </LinkNavigate>
  );
};
