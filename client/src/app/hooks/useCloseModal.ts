import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

interface UseCloseModalType {
  setModal: Dispatch<SetStateAction<boolean>>;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const useCloseModal = ({ setModal, buttonRef }: UseCloseModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //     setModal(false);
  //   }
  // };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      (!buttonRef?.current || !buttonRef.current.contains(event.target as Node))
    ) {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    modalRef,
  };
};

export default useCloseModal;
