import { useDynamicModalPosition } from '@/app/hooks/useDynamicModalPosition';
import { getDynamicPositionClass } from '@/app/libs/get-dynamic-position-class';
import Modal from './Modal';
import { useRef, useState } from 'react';

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
  parentPadding?: number;
}

export const DynamicModal = ({ btnRef, parentPadding = 8 }: Props) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const position = useDynamicModalPosition({
    btnRef,
    parentPadding,
    modalRef,
  });

  const modalPositionClass = getDynamicPositionClass({ ...position });

  const handleModalOpen = () => setIsOpen(!isOpen);

  return (
    <Modal
      props={{
        wrapperRef: modalRef,
        isModalOpen: isOpen,
        setModal: handleModalOpen,
      }}
    >
      <p></p>
    </Modal>
  );
};
