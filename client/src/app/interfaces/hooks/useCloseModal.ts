import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

interface UseCloseModalType {
  setModal?: Dispatch<SetStateAction<boolean>>;
  closeBothModal?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const useCloseModal = ({
  setModal,
  closeBothModal,
  inputRef,
}: UseCloseModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (
      modalRef.current &&
      !modalRef.current.contains(target) &&
      (!inputRef || !inputRef.current?.contains(target))
    ) {
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
