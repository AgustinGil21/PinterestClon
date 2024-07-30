import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

interface UseCloseModalType {
  setModal?: Dispatch<SetStateAction<boolean>>;
  closeBothModal?: () => void;
}

const useCloseModal = ({ setModal, closeBothModal }: UseCloseModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      if (setModal) setModal(false);
      if (closeBothModal) closeBothModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside, closeBothModal]);

  return {
    modalRef,
  };
};

export default useCloseModal;
