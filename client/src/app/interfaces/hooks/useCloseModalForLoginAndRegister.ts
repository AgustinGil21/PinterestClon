import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

interface UseCloseModalType {
  setModal?: Dispatch<SetStateAction<boolean>>;
  closeBothModal?: () => void;
}

const useCloseModalModalForLoginAndRegister = ({
  setModal,
  closeBothModal,
}: UseCloseModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      if (setModal) setModal(false);
      if (closeBothModal) closeBothModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Cambié 'click' por 'mousedown'
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setModal, closeBothModal]);

  return {
    modalRef,
  };
};

export default useCloseModalModalForLoginAndRegister;
