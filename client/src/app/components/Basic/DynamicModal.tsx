import { useDynamicModalPosition } from '@/app/hooks/useDynamicModalPosition';
import { getDynamicPositionClass } from '@/app/libs/get-dynamic-position-class';
import Modal from './Modal';
import { useEffect, useRef, useState } from 'react';

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
  padding?: number;
  children?: React.ReactNode;
  className?: string;
  handleModalOpen: () => void;
  isOpen: boolean;
}

export const DynamicModal = ({
  btnRef,
  padding = 8,
  children,
  className,
  handleModalOpen,
  isOpen,
}: Props) => {
  const [modalClass, setModalClass] = useState('');
  const [positionReady, setPositionReady] = useState(false);

  const position = useDynamicModalPosition({
    btnRef,
    padding,
    modalWidth: 360,
    modalHeight: 502,
  });

  useEffect(() => {
    const modalPositionClass = getDynamicPositionClass({ ...position });

    setModalClass(modalPositionClass);
    setPositionReady(true);
  }, [position, btnRef.current]);

  return (
    <Modal
      props={{
        isModalOpen: isOpen,
        setModal: handleModalOpen,
        className: `absolute ${modalClass} ${className} ${
          positionReady ? 'visible' : 'invisible'
        }`,
        buttonRef: btnRef,
      }}
    >
      {children}
    </Modal>
  );
};
