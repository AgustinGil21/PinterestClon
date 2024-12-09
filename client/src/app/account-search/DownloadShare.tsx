import { useAppsStore } from '../infrastructure/stores/useAppStore';
import DownloadIcon from '../interfaces/components/icons/DownloadIcon';
import useCloseModal from '../interfaces/hooks/useCloseModal';
import ModalShareAccount from '../user-profile/ModalShareAccount';

const DownloadShare = () => {
  const {
    openDownloadAccountModal,
    isDownloadAccountOpen,
    dataSearchUserProfile,
  } = useAppsStore();
  const { modalRef } = useCloseModal({ setModal: openDownloadAccountModal });

  return (
    <div className='relative inline-block'>
      <div
        className={`p-3 rounded-full cursor-pointer  dark:bg-gray-400 ${
          isDownloadAccountOpen
            ? 'bg-black hover:bg-black'
            : 'hover:bg-gray-200'
        }`}
        onClick={openDownloadAccountModal}
      >
        <DownloadIcon isDownloadAccountOpen={isDownloadAccountOpen} />
      </div>
      {isDownloadAccountOpen && (
        <div className='absolute top-full mt-2 w-full min-w-[310px] left-1/2 transform -translate-x-[11%] sm:-translate-x-[30%]'>
          <ModalShareAccount
            classProps='w-full'
            modalRef={modalRef}
            username={dataSearchUserProfile.username}
          />
        </div>
      )}
    </div>
  );
};

export default DownloadShare;
