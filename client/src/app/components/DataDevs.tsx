// 'use client';
// import React from 'react';
// import AnswerIcon from './icons/AnswerIcon';
// import Tooltip from './Header/ToolTip';
// import { useState } from 'react';
// import ModalStyled from './Basic/ModalStyled';
// import GitHubIcon from './icons/GitHubIcon';
// import LinkedinIcon from './icons/LinkedinIcon';
// import useCloseModal from '../hooks/useCloseModal';

// const DataDevs = () => {
//   const [modal, setModal] = useState(false);
//   const { modalRef } = useCloseModal({ setModal });

//   return (
//     <>
//       <button
//         className='relative bottom-6 right-7  p-2.5 rounded-full cursor-pointer shadow-uniform border-[1px] z-50 bg-white'
//         onClick={() => setModal(!modal)}
//       >
//         <Tooltip tooltipText='Más' isVisible={modal}>
//           <AnswerIcon />
//         </Tooltip>
//         {modal && (
//           <ModalStyled
//             modalRef={modalRef}
//             classProps={
//               'absolute right-0 bottom-0 max-w-[180px] p-2 border-[0.5px]'
//             }
//           >
//             <div className='flex flex-col text-sm gap-2'>
//               <p className='px-2 pt-2'>Developed by</p>
//               <hr />
//               <div>
//                 <span className='hover:bg-slate-100 px-1 py-1 rounded-lg cursor-cell flex justify-between items-center gap-1'>
//                   Agustín Gil
//                   <div className='flex'>
//                     <a href='  https://github.com/AgustinGil21' target='_blank'>
//                       <GitHubIcon />
//                     </a>
//                     <a href='linkedin.com' target='_blank'>
//                       <LinkedinIcon />
//                     </a>
//                   </div>
//                 </span>
//               </div>
//               <span className='hover:bg-slate-100 px-1 py-1 rounded-lg cursor-cell flex items-center gap-1 text-nowrap justify-between'>
//                 Santino Steckler
//                 <div className='flex'>
//                   <a href='https://github.com/SSantinoSteckler' target='_blank'>
//                     <GitHubIcon />
//                   </a>
//                   <a
//                     href='https://www.linkedin.com/in/lucas-santino-steckler-1821ab282/'
//                     target='_blank'
//                   >
//                     <LinkedinIcon />
//                   </a>
//                 </div>
//               </span>
//             </div>
//           </ModalStyled>
//         )}
//       </button>
//     </>
//   );
// };

// export default DataDevs;

'use client';
import React, { useState } from 'react';
import AnswerIcon from './icons/AnswerIcon';
import Tooltip from './Header/ToolTip';
import ModalStyled from './Basic/ModalStyled';
import GitHubIcon from './icons/GitHubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import useCloseModal from '../hooks/useCloseModal';

const developers = [
  {
    name: 'Agustín Gil',
    github: 'https://github.com/AgustinGil21',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Santino Steckler',
    github: 'https://github.com/SSantinoSteckler',
    linkedin: 'https://www.linkedin.com/in/lucas-santino-steckler-1821ab282/',
  },
];

const DataDevs = () => {
  const [modal, setModal] = useState(false);
  const { modalRef } = useCloseModal({ setModal });

  return (
    <div className='relative'>
      {/* Button to toggle modal */}
      <button
        className='p-2.5 rounded-full cursor-pointer shadow-uniform border bg-white z-50'
        onClick={() => setModal((prev) => !prev)}
      >
        <Tooltip tooltipText='Más' isVisible={modal}>
          <AnswerIcon />
        </Tooltip>
      </button>

      {/* Modal */}
      {modal && (
        <ModalStyled
          modalRef={modalRef}
          classProps='absolute bottom-[calc(100%+8px)] right-0 w-[200px] bg-white border shadow-lg p-3 rounded-lg z-50'
        >
          <div className='flex flex-col gap-3'>
            <p className='text-sm font-semibold'>Developed by</p>
            <hr className='border-gray-300' />
            {developers.map((dev, index) => (
              <div
                key={index}
                className='flex justify-between items-center text-sm hover:bg-gray-100 p-2 rounded cursor-pointer'
              >
                <span>{dev.name}</span>
                <div className='flex gap-2'>
                  <a
                    href={dev.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <GitHubIcon />
                  </a>
                  <a
                    href={dev.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ModalStyled>
      )}
    </div>
  );
};

export default DataDevs;
