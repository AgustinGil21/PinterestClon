import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';
import ArrowCreatTopIcon from '../../../../interfaces/components/icons/ArrowCreatTopIcon';

const NotImagePin = () => {
  const { t } = useAppsStore();

  return (
    <>
      <div className='flex justify-center flex-col items-center gap-2 max-w-[220px] h-full text-center'>
        <ArrowCreatTopIcon />
        <span className='text-[14px]'>
          {t?.['create-pin'].form.image.explanation ||
            'Elige un archivo o arrástralo y colócalo aquí'}
        </span>
      </div>

      <div className='flex items-end'>
        <span className='text-[12px] text-center'>
          {t?.['create-pin'].form.image.recommendation ||
            'Recomendamos usar archivos .jpg de alta calidad con un tamaño inferior a 20mb'}
        </span>
      </div>
    </>
  );
};

export default NotImagePin;
