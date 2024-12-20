import ModalStyled from '../interfaces/components/Basic/ModalStyled';
import Xcomponent from '../interfaces/components/icons/Xcomponent';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import UserFollowFollowingCard from './UserFollowFollwingCard';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import useCloseModal from '../hooks/useCloseModal';

const ModalFollowings = () => {
  const { followingList, openFollowingsModal } = useAppsStore();
  const { modalRef } = useCloseModal({ setModal: openFollowingsModal });
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center '>
      <div className='absolute inset-0 bg-black opacity-50 flex items-center justify-center '></div>
      <ModalStyled
        modalRef={modalRef}
        classProps='max-w-[440px] top-[150px] rounded-xl 
               '
      >
        <div className='p-3 '>
          <div className='flex flex-row items-center justify-between gap-5'>
            <h4 className='font-bold text-[22px]'>
              {followingList.followingCount} {''}
              {followingList.followingCount > 1 ? 'seguidos' : 'seguido'}
            </h4>
            <ButtonStyled handleClick={openFollowingsModal} className=''>
              <Xcomponent />
            </ButtonStyled>
          </div>

          <div className='mt-3 overflow-y-scroll max-h-[590px]'>
            {followingList.following.map((elem) => (
              <UserFollowFollowingCard
                key={elem.id}
                elem={elem}
                openFollowersModal={openFollowingsModal}
              />
            ))}
          </div>
        </div>
      </ModalStyled>
    </div>
  );
};

export default ModalFollowings;
