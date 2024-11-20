import ArrowCreatTopIcon from '@/app/interfaces/components/icons/ArrowCreatTopIcon';

const NotImagePin = () => {
  return (
    <>
      <div className='flex justify-center flex-col items-center gap-2 max-w-[220px] h-full text-center'>
        <ArrowCreatTopIcon />
        <span className='text-[14px]'>
          Elige un archivo o arrástralo y colócalo aquí
        </span>
      </div>

      <div className='flex items-end'>
        <span className='text-[12px] text-center'>
          Recomendamos usar archivos .jpg de alta calidad con un tamaño inferior
          a 20mb
        </span>
      </div>
    </>
  );
};

export default NotImagePin;
