import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRef, useEffect, useState } from 'react';
import { PreviousPin } from '@/app/domain/types/pins-structure';
import { UseFormClearErrors } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';

interface InterfaceUsePreviousPins {
  elem: PreviousPin;

  clearErrors: UseFormClearErrors<FieldValues>;
}

const usePreviousPins = ({ elem, clearErrors }: InterfaceUsePreviousPins) => {
  const {
    closeDeletePinModal,
    getPinEditId,
    updateStateCreatePin,
    dataCreatePin,
  } = useAppsStore();
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !Object.values(buttonRefs.current).some(
          (ref) => ref && ref.contains(event.target as Node)
        )
      ) {
        setOpenModalId(null);
        closeDeletePinModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDeletePinModal]);

  const handleClickOpenMenu = (id: string, e: any) => {
    e.stopPropagation();
    setOpenModalId(openModalId === id ? null : id);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  const handleClickContainer = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (
      !Object.values(buttonRefs.current).some(
        (ref) => ref && ref.contains(e.target as Node)
      )
    )
      await getPinEditId(elem.id);

    clearErrors();
  };

  return {
    handleClickContainer,
    handleImageError,
    handleImageLoad,
    handleClickOpenMenu,
    openModalId,
    setOpenModalId,
    buttonRefs,
    imageLoaded,
    modalRef,
  };
};

export default usePreviousPins;
