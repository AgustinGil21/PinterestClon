import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface Props {
  searchValue: string;
  type: 'pin' | 'board' | 'user';
}

export const EmptyMsg = ({ searchValue, type }: Props) => {
  const { t } = useAppsStore();

  return (
    <div className={`absolute top-[160px]    w-full p-1 text-wrap`}>
      <p className='text-[15px] text-black text-center'>
        {t?.search.empty[type].pt1 ||
          'Lo sentimos, no encontramos ningún {`${type}`} relacionado con'}{' '}
        <strong className='font-semibold'>&quot;{searchValue}&quot;</strong>
        {t?.search.empty[type].pt2 || 'Prueba con otra búsqueda.'}
      </p>
    </div>
  );
};
