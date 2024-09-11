import ArrowCreatRightIcon from '@/app/interfaces/components/icons/ArrowCreatRightIcon';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';

interface AsideCreateCloseInterface {
  handleClick: () => void;
}

const AsideCreateOpen = ({ handleClick }: AsideCreateCloseInterface) => {
  return (
    <div className='border-r-gray-300  border-r-[1px] w-[18%] h-full flex flex-col items-center gap-6'>
      <div className='border-b-[1px] border-b-gray-300 p-3 px-5 h-[13%] w-full'>
        <div className='flex flex-col gap-2 justify-between h-full'>
          <div className='flex justify-between items-center '>
            <h3 className='font-semibold dark:text-white'>Mis Publicaciones</h3>
            <button
              className='hover:bg-slate-100 dark:hover:bg-black rounded-full p-2.5 cursor-pointer '
              onClick={handleClick}
            >
              <ArrowCreatRightIcon />
            </button>
          </div>
          <ButtonStyled
            disabled={false}
            className='bg-buttonGreyBg font-semibold w-full text-sm hover:bg-gray-300 py-1.5'
          >
            Crear nuevo
          </ButtonStyled>
        </div>
      </div>
    </div>
  );
};

export default AsideCreateOpen;
