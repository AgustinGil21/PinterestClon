'use client';
import React from 'react';
import AnswerIcon from '../components/icons/AnswerIcon';
import Tooltip from '../components/Basic/ToolTip';
import { useState } from 'react';
import ModalStyled from '../components/Basic/ModalStyled';
import GitHubIcon from '../components/icons/GitHubIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import useCloseModal from '../hooks/useCloseModal';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useHideElementWithPathname } from '@/app/hooks/useHideElementWithPathname';

const developers = [
  {
    name: 'Agustín Gil',
    github: 'https://github.com/AgustinGil21',
    linkedin: 'https://linkedin.com/in/agustín-gil-470b44294',
  },
  {
    name: 'Santino Steckler',
    github: 'https://github.com/SSantinoSteckler',
    linkedin: 'https://www.linkedin.com/in/lucas-santino-steckler-1821ab282/',
  },
];

const DataDevs = () => {
  const pathnames = [
    '/edit-user',
    '/admin-user',
    '/security-profile',
    '/privacy-info',
    '/info-clon',
    '/about-us',
    '/technologies',
  ];

  const dynamicPathnames = ['/create-pin'];

  const hide = useHideElementWithPathname({
    pathnames,
    dynamicPathnames,
    maxWidth: 768,
  });
  const [modal, setModal] = useState(false);
  const { t } = useAppsStore();

  const { modalRef } = useCloseModal({ setModal });

  return (
    <>
      <button
        className='fixed bottom-20 md:bottom-5 right-7  p-2.5 rounded-full cursor-pointer shadow-uniform border-[1px] z-50 bg-white hover:bg-gray-300  flex justify-center items-center'
        onClick={() => setModal(!modal)}
        style={{
          display: `${hide ? 'none' : 'block'}`,
        }}
      >
        <Tooltip
          tooltipText={t?.['data-devs'].tooltip || 'Mas'}
          isVisible={modal}
        >
          <AnswerIcon />
        </Tooltip>
      </button>
      {modal && (
        <ModalStyled
          modalRef={modalRef}
          classProps={
            'fixed-modal right-14  bottom-[140px] md:bottom-[80px]  p-2 border-[0.5px] rounded-xl xl:right-16 w-[200px] max-w-[200px]'
          }
        >
          <div className='flex flex-col text-sm lg:text-md gap-2'>
            <p className='px-2 pt-2  dark:text-white'>
              {t?.['data-devs'].text || 'Desarrollado por'}
            </p>
            <hr />
            <div>
              <span className='hover:bg-slate-100 dark:hover:bg-gray-900 dark:text-white px-1 py-2 rounded-lg cursor-cell flex justify-between items-center gap-1'>
                {developers[0].name}
                <div className='flex gap-1'>
                  <a href={developers[0].github} target='_blank'>
                    <GitHubIcon
                      svgClassName='group'
                      pathClassName='stroke-gray-700 group-hover:stroke-[#e60023] stroke-2'
                    />
                  </a>
                  <a href={developers[0].linkedin} target='_blank'>
                    <LinkedinIcon
                      svgClassName='group'
                      pathClassName='stroke-gray-700 group-hover:stroke-[#e60023]'
                    />
                  </a>
                </div>
              </span>
            </div>
            <span className='hover:bg-slate-100 dark:hover:bg-gray-900 dark:text-white px-1 py-2 rounded-lg cursor-cell flex items-center gap-1 text-nowrap justify-between'>
              {developers[1].name}
              <div className='flex gap-1'>
                <a href={developers[1].github} target='_blank'>
                  <GitHubIcon
                    svgClassName='group'
                    pathClassName='stroke-gray-700 group-hover:stroke-[#e60023] stroke-2'
                  />
                </a>
                <a href={developers[1].linkedin} target='_blank'>
                  <LinkedinIcon
                    svgClassName='group'
                    pathClassName='stroke-gray-700 group-hover:stroke-[#e60023]'
                  />
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
