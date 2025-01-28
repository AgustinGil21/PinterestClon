import Modal from '@/app/components/Basic/Modal';
import { ShareComponent } from '@/app/components/Basic/ShareComponent';

interface Props {
  category: string;
  setModal: () => void;
  modalIsOpen: boolean;
  btnRef: React.RefObject<HTMLButtonElement>;
  className?: string;
}

export const CategoryShareModal = ({
  category,
  setModal,
  modalIsOpen,
  btnRef,
}: Props) => {
  return (
    <Modal
      props={{
        setModal: setModal,
        isModalOpen: modalIsOpen,
        buttonRef: btnRef,
        className: `p-4 rounded-lg absolute -bottom-[110px] z-50 bg-white w-[277px] right-0 translate-x-[calc(100%-280px)] sm:-translate-x-0 sm:left-1/2`,
      }}
    >
      <ShareComponent endpoint='/searchcategory' data={category} />
    </Modal>
  );
};
