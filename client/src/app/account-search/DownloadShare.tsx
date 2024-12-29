import { useAppsStore } from '../infrastructure/stores/useAppStore';
import DownloadIcon from '../interfaces/components/icons/DownloadIcon';
import useCloseModal from '../interfaces/hooks/useCloseModal';
import ModalShareAccount from '../user-profile/ModalShareAccount';

interface DownloadShareInterface {
  classProps?: string;
  dataShare: string;
}

const DownloadShare = ({ classProps, dataShare }: DownloadShareInterface) => {
  const {
    openDownloadAccountModal,
    isDownloadAccountOpen,
    openRegisterModal,
    dataSearchUserProfile,
    isAuth,
  } = useAppsStore();
  const { modalRef } = useCloseModal({ setModal: openDownloadAccountModal });

  const handleClick = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    openDownloadAccountModal();
  };

  return (
    <div className='relative inline-block'>
      <div
        className={`${classProps} rounded-full cursor-pointer transition-colors duration-300 dark:bg-gray-400 ${
          isDownloadAccountOpen
            ? 'bg-black hover:bg-black'
            : 'hover:bg-gray-200'
        }`}
        onClick={handleClick}
      >
        <DownloadIcon isDownloadAccountOpen={isDownloadAccountOpen} />
      </div>
      {isDownloadAccountOpen && (
        <div className='absolute top-full mt-2 w-full min-w-[310px] left-1/2 transform -translate-x-[11%] sm:-translate-x-[30%]'>
          <ModalShareAccount
            classProps='w-full'
            modalRef={modalRef}
            dataShare={dataShare}
          />
        </div>
      )}
    </div>
  );
};

export default DownloadShare;
