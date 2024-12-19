import { RefObject, useState } from 'react';
import ModalStyled from '../interfaces/components/Basic/ModalStyled';
import CopyUrl from '../interfaces/components/icons/CopyUrl';
import WhatsappIcon from '../interfaces/components/icons/WhatsappIcon';
import MessengerIcon from '../interfaces/components/icons/MessengerIcon';
import TwitterIcon from '../interfaces/components/icons/TwitterIcon';
import FacebookIcon from '../interfaces/components/icons/FacebookIcon';

interface ModalShareAccountInterface {
  modalRef: RefObject<HTMLDivElement>;
  username: string;
  classProps?: string;
}

const ModalShareAccount = ({
  modalRef,
  username,
  classProps,
}: ModalShareAccountInterface) => {
  const [copied, setCopied] = useState(false);

  const openSocialMedia = (url: string) => {
    window.open(url, '_blank');
  };

  const copyToClipboard = (
    text: string,
    setCopied: (copied: boolean) => void
  ) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const domain = 'https://pinterestClon.com';
  const urlToShare = `${domain}/${username}`;

  const socialMediaLinks = [
    {
      name: 'WhatsApp',
      icon: <WhatsappIcon />,
      url: `https://wa.me/?text=${encodeURIComponent(urlToShare)}`,
    },
    {
      name: 'Messenger',
      icon: <MessengerIcon />,
      url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
        urlToShare
      )}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(urlToShare)}`,
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        urlToShare
      )}`,
    },
    {
      name: 'X',
      icon: <TwitterIcon />,
      url: `https://twitter.com/share?url=${encodeURIComponent(urlToShare)}`,
    },
  ];

  return (
    <ModalStyled
      modalRef={modalRef}
      classProps={`fixed min-h-[230px] sm:max-w-[390px] py-5 px-4 rounded-xl  ${classProps}`}
    >
      <div>
        <h4 className='text-center text-black text-[16px] font-semibold dark:text-white'>
          Compartir
        </h4>
        <div className='grid grid-cols-4 items-center mt-2 gap-1 max-w-[300px]'>
          <div
            onClick={() => copyToClipboard(urlToShare, setCopied)}
            className='flex justify-center flex-col items-center gap-1 cursor-pointer  dark:text-white'
          >
            <div className='bg-gray-200 rounded-full p-2 flex justify-center items-center w-[44px] h-[44px] hover:bg-gray-300 mt-1 '>
              <CopyUrl />
            </div>
            <span className='text-[11px] text-black text-center text-nowrap'>
              {copied ? 'Enlace copiado' : 'Copiar enlace'}
            </span>
          </div>

          {socialMediaLinks.map((social, index) => (
            <div
              key={index}
              onClick={() => openSocialMedia(social.url)}
              className='flex justify-center flex-col items-center gap-1 mt-1 cursor-pointer dark:text-white flex-wrap'
            >
              <div className='w-[44px] h-[44px] flex justify-center items-center hover:brightness-75'>
                {social.icon}
              </div>
              <span className='text-[11px] text-black'>{social.name}</span>
            </div>
          ))}
        </div>
        <hr className='w-full h-[4px] mt-2' />
      </div>
    </ModalStyled>
  );
};

export default ModalShareAccount;
