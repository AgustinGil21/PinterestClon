'use client';

import { useRouter } from 'next/navigation';
import Modal from '../components/Basic/Modal';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

export const AdultContentModal = () => {
  const router = useRouter();
  const {
    t,
    adultContentModalIsOpen,
    setAdultContentModal,
    adultContentPinID,
  } = useAppsStore();

  const handleClose = () => setAdultContentModal();
  const handleContinue = () => {
    const fetchData = async () => {
      try {
        let pinId = String(adultContentPinID).trim();

        if (!pinId.startsWith('http')) {
          pinId = `/${pinId}`;
        }

        if (pinId.includes('pin')) {
          router.push(pinId);
        } else {
          router.push(`/pin/${pinId}`);
        }
      } catch (error) {
        return null;
      }
    };
    fetchData();
    setAdultContentModal();
  };

  return (
    <Modal
      props={{
        blackFilter: true,
        isModalOpen: adultContentModalIsOpen,
        setModal: setAdultContentModal,
        className:
          'p-4 bg-white shadow-uniform min-w-[360px] rounded-lg max-w-[600px] fixed z-[71] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[550px]',
      }}
    >
      <section className='flex flex-col gap-6'>
        <article className='flex flex-col gap-3 items-center'>
          <h2 className='font-bold text-xl md:text-2xl'>
            {t?.adult.modal.title || 'Contenido sensible'}
          </h2>
          <p className='text-base md:text-lg text-pretty'>
            {t?.adult.modal.description ||
              'Esta publicación está marcada como contenido para adultos. El acceso queda bajo tu responsabilidad. Puede contener desnudos, por lo que recomendamos discreción.'}
          </p>
        </article>
        <article className='flex justify-around'>
          <button
            onClick={handleClose}
            className='py-2 px-3 rounded-3xl bg-slate-200 text-base font-semibold'
          >
            {t?.adult.modal.buttons.cancel || 'Cancelar'}
          </button>
          <button
            onClick={handleContinue}
            className='py-2 px-3 rounded-3xl bg-redPinterestBg text-base font-semibold text-white'
          >
            {t?.adult.modal.buttons.continue || 'Continuar'}
          </button>
        </article>
      </section>
    </Modal>
  );
};
