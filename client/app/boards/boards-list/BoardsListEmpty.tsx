import { useAppsStore } from '../../infrastructure/stores/useAppStore';

interface Props {
  typing?: boolean;
}

export const BoardsListEmpty = ({ typing = false }: Props) => {
  const { t } = useAppsStore();

  return (
    <>
      <span className='self-center justify-self-center mt-10 text-xl font-semibold text-[#b3b3b3]'>
        {typing
          ? t?.['boards-list']['empty-typing'] || 'Crea un tablero primero'
          : t?.['boards-list'].empty || 'Sin tableros'}
      </span>
    </>
  );
};
