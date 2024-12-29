import ModalStyled from '../interfaces/components/Basic/ModalStyled';
import Xcomponent from '../interfaces/components/icons/Xcomponent';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import UserFollowFollowingCard from './UserFollowFollwingCard';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import useCloseModal from '../hooks/useCloseModal';

const ModalFollowers = () => {
  const { followersList, openFollowersModal } = useAppsStore();
  const { modalRef } = useCloseModal({ setModal: openFollowersModal });
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center '>
      <div className='absolute inset-0 bg-black opacity-50 flex items-center justify-center'></div>
      <ModalStyled
        modalRef={modalRef}
        classProps='max-w-[440px] modal rounded-xl 
               '
      >
        <div className='p-3 '>
          <div className='flex flex-row items-center justify-between gap-5'>
            <h4 className='font-bold text-[22px]'>
              {followersList.followersCount} {''}
              {followersList.followersCount > 1 ? 'seguidores' : 'seguidor'}
            </h4>
            <ButtonStyled handleClick={openFollowersModal} className=''>
              <Xcomponent />
            </ButtonStyled>
          </div>

          <div className='mt-3 overflow-y-scroll max-w-[590px] '>
            {followersList.followers.map((elem) => (
              <UserFollowFollowingCard
                key={elem.id}
                elem={elem}
                openFollowersModal={openFollowersModal}
              />
            ))}
          </div>
        </div>
      </ModalStyled>
    </div>
  );
};

export default ModalFollowers;
