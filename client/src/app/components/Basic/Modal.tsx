import useCloseModal from '@/app/hooks/useCloseModal';

interface Props {
  children?: React.ReactNode;
  setModal: () => void;
  isModalOpen: boolean;
  className?: string;
  wrapperRef?: React.RefObject<HTMLDivElement>;
}

interface ModalComponentProps {
  props: Props;
  children?: React.ReactNode;
}

const Modal = ({ props, children }: ModalComponentProps) => {
  const { className, setModal, isModalOpen, wrapperRef } = props;

  const { modalRef } = useCloseModal({ setModal });

  return (
    <>
      {isModalOpen && (
        <div ref={wrapperRef}>
          <div
            ref={modalRef}
            className={`absolute shadow-uniform left-[50%] bottom-[50%] translate-x-[-50%] translate-y-[50%] z-40 ${className} modal`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
