import { FaEyeSlash, FaRegEyeSlash } from 'react-icons/fa';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetScreenSize } from '../hooks/useGetScreenSize';

interface Props {
  pinID?: string;
}

export const AdultContentPreview = ({ pinID }: Props) => {
  const { t, setAdultContentModal } = useAppsStore();
  const { width } = useGetScreenSize();
  const handleClick = () => setAdultContentModal(pinID);

  const iconSize = width < 427 ? 40 : width < 769 && width > 426 ? 50 : 60;

  return (
    <div
      className='w-full absolute top-0 bottom-0 left-0 right-0 bg-black text-white font-semibold rounded-[16px] p-2 flex flex-col justify-center items-center hover:bg-[#111111] transition-colors'
      onClick={handleClick}
    >
      <FaRegEyeSlash size={iconSize} />
      <span className='text-xs md:text-base lg:text-lg'>
        {t?.adult['pin-preview'] || 'Contenido sensible'}
      </span>
    </div>
  );
};
