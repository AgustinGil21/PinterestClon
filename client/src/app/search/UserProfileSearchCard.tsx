import Follow from '../account-search/Follow';
import InteractionSummary from '../components/Basic/InteractionSummary';
import LinkNavigate from '../components/Header/LinkNavigate';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import AvatarUser from '../interfaces/layout/Header/Avatar/AvatarUser';
import { IUser } from './interfaces/user-interface';

interface Props {
  user: IUser;
}

export const UserProfileSearchCard = ({ user }: Props) => {
  const { t } = useAppsStore();

  return (
    <LinkNavigate
      href={`/${user.username}`}
      classProps='hover:cursor-pointer w-full flex justify-center'
    >
      <section className='h-[72px] max-w-[390px] min-w-[360px] py-2 px-1.5 hover:bg-searchBg  flex justify-around items-center gap-2 overflow-hidden transition-colors rounded-lg group w-full'>
        <AvatarUser
          data={{
            avatar: user.avatar,
            avatar_letter: user.avatar_letter,
            avatar_background: user.avatar_background,
            avatar_letter_color: user.avatar_letter_color,
          }}
          classProps='w-[48px] h-[48px] min-w-[48px] min-h-[48px] rounded-full'
          textSize='text-base'
        />
        <article className='flex items-center gap-1 w-full overflow-hidden justify-between'>
          <div className='flex justify-center flex-col w-full overflow-hidden pr-2'>
            <p className='text-base text-ellipsis font-semibold'>
              {user.name
                ? `${user.name}${user.surname ? ` ${user.surname}` : ''}`
                : user.username}
            </p>
            <InteractionSummary
              type='followers'
              value={user.followers_count}
              numberFirst
              className='flex gap-1 text-xs'
            />
          </div>
          {user.its_you ? (
            <ButtonStyled
              className='bg-gray-200 font-semibold text-[9.8px] cursor-pointer text-gray-400'
              disabled={true}
            >
              {t?.['followers-&-following-list'].its_you || '¡Eres tú!'}
            </ButtonStyled>
          ) : (
            <Follow
              id={user.id}
              following={user.following}
              classPropsFalseIsFollowing=' text-black bg-searchBg group-hover:bg-[#e0e0e0] hover:bg-[#d6d6d6] px-5 py-3 flex justify-center items-center '
              classPropsTrueIsFollowing='bg-black text-white px-5 py-3 flex justify-center items-center'
            />
          )}
        </article>
      </section>
    </LinkNavigate>
  );
};
