'use client';
import React from 'react';
import AnswerIcon from '../components/icons/AnswerIcon';
import Tooltip from '../components/Basic/ToolTip';
import { useState } from 'react';
import ModalStyled from '../components/Basic/ModalStyled';
import GitHubIcon from '../components/icons/GitHubIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import useCloseModal from '../hooks/useCloseModal';

const DataDevs = () => {
  const [modal, setModal] = useState(false);

  const { modalRef } = useCloseModal({ setModal });

  return (
    <>
      <button
        className='fixed bottom-3.5 right-7  p-2.5 rounded-full cursor-pointer shadow-uniform border-[1px] z-50 bg-white hover:bg-gray-300'
        onClick={() => setModal(!modal)}
      >
        <Tooltip tooltipText='Mas' isVisible={modal}>
          <AnswerIcon />
        </Tooltip>
      </button>
      {modal && (
        <ModalStyled
          modalRef={modalRef}
          classProps={
            'right-9 bottom-20 max-w-[180px] p-2 border-[0.5px] rounded-xl  '
          }
        >
          <div className='flex flex-col text-sm gap-3'>
            <p className='px-2 pt-2  dark:text-white'>Developed by</p>
            <hr />
            <div>
              <span className='hover:bg-slate-100 dark:hover:bg-gray-900 dark:text-white px-1 py-1 rounded-lg cursor-cell flex justify-between items-center gap-1'>
                Agustin Gil
                <div className='flex'>
                  <a href='  https://github.com/AgustinGil21' target='_blank'>
                    <GitHubIcon />
                  </a>
                  <a href='linkedin.com' target='_blank'>
                    <LinkedinIcon />
                  </a>
                </div>
              </span>
            </div>
            <span className='hover:bg-slate-100 dark:hover:bg-gray-900 dark:text-white px-1 py-1 rounded-lg cursor-cell flex items-center gap-1 text-nowrap justify-between'>
              Santino Steckler
              <div className='flex'>
                <a href='https://github.com/SSantinoSteckler' target='_blank'>
                  <GitHubIcon />
                </a>
                <a
                  href='https://www.linkedin.com/in/lucas-santino-steckler-1821ab282/'
                  target='_blank'
                >
                  <LinkedinIcon />
                </a>
              </div>
            </span>
          </div>
        </ModalStyled>
      )}
    </>
  );
};

export default DataDevs;
