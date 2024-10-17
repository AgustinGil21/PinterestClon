import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';

const SavePinsButton = () => {
  return (
    <div className='w-full px-6 4 mt-4'>
      <hr className='w-full border-t-[1.5px] border-gray-300' />
      <div className='w-full flex justify-between flex-row mt-4  items-center'>
        <span className='text-sm font-semibold'>
          ¿Estás buscando ideas que guardaste?
        </span>
        <ButtonStyled
          type='button'
          className='font-semibold bg-buttonGreyBg hover:bg-gray-300 text-[11px]'
        >
          Buscar tus Pines
        </ButtonStyled>
      </div>
    </div>
  );
};

export default SavePinsButton;
