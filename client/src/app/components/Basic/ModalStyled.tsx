import { RefObject } from 'react';

interface ModalStyledProps {
  children: React.ReactNode;
  classProps?: string;
  modalRef: RefObject<HTMLDivElement>;
}

const ModalStyled = ({ children, classProps, modalRef }: ModalStyledProps) => {
  return (
    <>
      <div
        ref={modalRef}
        className={`absolute shadow-uniform bg-white  w-full rounded-xl z-50 ${classProps}`}
      >
        {children}
      </div>
    </>
  );
};

export default ModalStyled;
