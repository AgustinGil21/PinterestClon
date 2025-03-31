import ThreePointsIcon from '../interfaces/components/icons/ThreePointsIcon';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ModalStyled from '../interfaces/components/Basic/ModalStyled';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import useCloseModal from '../interfaces/hooks/useCloseModal';
import ModalReport from '../pin/[id]/ModalReport';

const ThreePointsBlok = () => {
  const {
    isThreePointsAccountOpen,
    openThreePointsAcountModal,
    isAuth,
    openRegisterModal,
    openReportModal,
    isOpenReportModal,

    t,
  } = useAppsStore();
  const { modalRef } = useCloseModal({
    setModal: openThreePointsAcountModal,
  });

  const handleClick = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    openThreePointsAcountModal();
  };

  const handleReport = () => {
    openReportModal('user');
  };

  return (
    <>
      <div className='relative inline-block'>
        <button
          className={`p-3 rounded-full cursor-pointer dark:bg-gray-400 ${
            isThreePointsAccountOpen
              ? 'bg-black hover:bg-black'
              : 'hover:bg-gray-200'
          }`}
          onClick={handleClick}
        >
          <ThreePointsIcon
            isThreePointsAccountOpen={isThreePointsAccountOpen}
          />
        </button>
        {isThreePointsAccountOpen && (
          <div className='absolute top-full mt-2 left-1/2 transform sm:-translate-x-1/2 min-w-[190px] translate-x-[-100%]'>
            <ModalStyled
              classProps='p-2 rounded-xl shadow-lg bg-white'
              modalRef={modalRef}
            >
              <div className='dark:text-white'>
                <span className='text-[11px] px-2'>
                  {t?.user['profile-options'].text || 'Opciones de perfil'}
                </span>
                <div className='flex flex-col items-start mt-2'>
                  {/* <ButtonStyled className='text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-900 w-full text-start rounded-lg'>
                  {t?.user['profile-options'].block || 'Bloquear'}
                </ButtonStyled> */}
                  <ButtonStyled
                    className='text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-900 w-full text-start rounded-lg'
                    handleClick={handleReport}
                  >
                    {t?.user['profile-options'].report || 'Reportar'}
                  </ButtonStyled>
                </div>
              </div>
            </ModalStyled>
          </div>
        )}
      </div>
      {isOpenReportModal && <ModalReport />}
    </>
  );
};

export default ThreePointsBlok;
