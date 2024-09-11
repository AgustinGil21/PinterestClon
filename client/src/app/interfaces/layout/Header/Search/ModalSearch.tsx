import React, { RefObject } from 'react';

interface ModalStateProps {
  modalRef: RefObject<HTMLDivElement>;
}

const ModalSearch = ({ modalRef }: ModalStateProps) => {
  return (
    <>
      <div className='fixed inset-0 bg-black opacity-50 z-40 top-[62px]'></div>
      <div
        ref={modalRef}
        className='absolute bg-white dark:bg-gray-900 w-[100%] h-[490px] rounded-xl z-[100] p-3'
        style={{ top: '45px', left: '46%', transform: 'translateX(-46%)' }}
      >
        <p className='text-2xl text-black'>Modal</p>
      </div>
    </>
  );
};

export default ModalSearch;
