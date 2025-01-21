import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import Link from 'next/link';

interface SavePinsButtonInterface {
  setModal: (value: boolean) => void;
}

const SavePinsButton = ({ setModal }: SavePinsButtonInterface) => {
  const { dataOwnerProfile } = useAppsStore();

  return (
    <div className='w-full px-6 4 mt-4 dark:text-white'>
      <hr className='w-full border-t-[1.5px] border-gray-300' />
      <div className='w-full flex justify-between flex-row mt-4  items-center'>
        <span className='text-sm font-semibold'>
          ¿Estás buscando ideas que guardaste?
        </span>
        <Link
          href={`/${dataOwnerProfile.username}`}
          onClick={() => setModal(false)}
        >
          <ButtonStyled
            type='button'
            className='font-semibold bg-buttonGreyBg hover:bg-gray-300 text-[11px] dark:text-black'
          >
            Buscar tus Pines
          </ButtonStyled>
        </Link>
      </div>
    </div>
  );
};

export default SavePinsButton;
