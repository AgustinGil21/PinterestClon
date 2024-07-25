import { RefObject } from 'react';

interface ModalStateProps {
  modalRef: RefObject<HTMLDivElement>;
}

const AuthModal = ({ modalRef }: ModalStateProps) => {
  return (
    <>
      <div className='fixed inset-0 bg-black opacity-50 z-40 top-16'></div>
      <div
        ref={modalRef}
        className='absolute bg-white w-[100%] h-[500px] rounded-xl z-50 p-3'
        style={{ top: '45px', left: '46%', transform: 'translateX(-46%)' }}
      >
        <p className='text-2xl text-black'>Modal</p>
      </div>
    </>
  );
};

export default AuthModal;
