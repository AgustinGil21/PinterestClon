import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface Props {
  pinID?: string;
}

export const AdultContentPreview = ({ pinID }: Props) => {
  const { t, setAdultContentModal } = useAppsStore();
  const handleClick = () => setAdultContentModal(pinID);

  return (
    <div
      className='w-full h-full bg-black text-white font-semibold min-h-full object-cover'
      onClick={handleClick}
    >
      {t?.adult['pin-preview'] || 'Contenido sensible'}
    </div>
  );
};
