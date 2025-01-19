import { useDynamicModalPosition } from '@/app/hooks/useDynamicModalPosition';
import Modal from './Modal';
import { useEffect, useRef, useState } from 'react';

interface Props {
  padding?: number;
  children?: React.ReactNode;
  className?: string;
  width: number;
  height: number;
  btnRef: React.RefObject<HTMLButtonElement>;
  dynamicModalIsOpen: boolean;
  closeDynamicModal: () => void;
}

export const DynamicModal = ({
  padding = 8,
  children,
  className,
  width,
  height,
  btnRef,
  dynamicModalIsOpen,
  closeDynamicModal,
}: Props) => {
  const [positionReady, setPositionReady] = useState(false);

  const { x, y } = useDynamicModalPosition({
    btnRef,
    padding,
    modalWidth: width,
    modalHeight: height,
  });

  useEffect(() => {
    setPositionReady(true);
  }, [x, y, btnRef.current]);

  return (
    <Modal
      props={{
        isModalOpen: dynamicModalIsOpen,
        setModal: closeDynamicModal,
        className: `absolute ${className} ${
          positionReady ? 'visible' : 'invisible'
        }`,
        buttonRef: btnRef,
        styles: {
          maxHeight: height,
          maxWidth: width,
          left: x,
          top: y,
        },
      }}
    >
      {children}
    </Modal>
  );
};
