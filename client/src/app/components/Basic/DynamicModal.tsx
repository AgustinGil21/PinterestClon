import { useDynamicModalPosition } from '@/app/hooks/useDynamicModalPosition';
import { getDynamicPositionClass } from '@/app/libs/get-dynamic-position-class';
import Modal from './Modal';
import { useEffect, useRef, useState } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface Props {
  padding?: number;
  children?: React.ReactNode;
  className?: string;
  width: number;
  height: number;
}

export const DynamicModal = ({
  padding = 8,
  children,
  className,
  width,
  height,
}: Props) => {
  const { closeDynamicModal, btnRef, dynamicModalIsOpen } = useAppsStore();
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
  console.log(x, y);

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
