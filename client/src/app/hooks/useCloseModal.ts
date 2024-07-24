import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

interface UseCloseModalType {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const useCloseModal = ({ setModal }: UseCloseModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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
