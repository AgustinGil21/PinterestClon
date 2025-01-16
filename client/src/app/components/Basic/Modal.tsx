import useCloseModal from '@/app/hooks/useCloseModal';
import { CSSProperties } from 'react';

interface Props {
  children?: React.ReactNode;
  setModal: () => void;
  isModalOpen: boolean;
  className?: string;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  wrapperClass?: string;
  styles?: CSSProperties;
  center?: boolean;
}

interface ModalComponentProps {
  props: Props;
  children?: React.ReactNode;
}

const Modal = ({ props, children }: ModalComponentProps) => {
  const {
    className,
    setModal,
    isModalOpen,
    wrapperRef,
    buttonRef,
    wrapperClass,
    styles,
    center = false,
  } = props;

  const { modalRef } = useCloseModal({ setModal, buttonRef });

  return (
    <>
      {isModalOpen && (
        <div ref={wrapperRef} className={`${wrapperClass}`}>
          <div
            ref={modalRef}
            style={styles}
            className={`${className}  ${
              center
                ? 'absolute shadow-uniform left-[50%] bottom-[50%] translate-x-[-50%] translate-y-[50%] z-40 ${className} modal'
                : 'z-40 shadow-uniform'
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
